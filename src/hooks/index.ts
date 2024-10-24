import { useCallback, useEffect, useRef, useState } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { RESET } from "jotai/utils";
import { authorize, EventName, events, getUserInfo } from "zmp-sdk";
import { useNavigate, useSnackbar } from "zmp-ui";

import { Cart } from "../types/cart";
import { matchStatusBarColor } from "../utils/device";
import { verifyLocationSearch } from "../utils/product";
import {
  cartAtom,
  isCartDrawerOpenAtom,
  isUserAuthorizedAtom,
  userInfoAtom,
  getSearchAtom,
} from "../state";

export const useResetCart = () => {
  const setCart = useSetAtom(cartAtom);
  useEffect(() => {
    setCart(RESET);
  }, []);
};

export function useMatchStatusTextColor(visible?: boolean) {
  const changedRef = useRef(false);
  useEffect(() => {
    if (changedRef.current) {
      matchStatusBarColor(visible ?? false);
    } else {
      changedRef.current = true;
    }
  }, [visible]);
}

const originalScreenHeight = window.innerHeight;

export function useVirtualKeyboardVisible() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const detectKeyboardOpen = () => {
      setVisible(window.innerHeight + 160 < originalScreenHeight);
    };
    window.addEventListener("resize", detectKeyboardOpen);
    return () => {
      window.removeEventListener("resize", detectKeyboardOpen);
    };
  }, []);

  return visible;
}

export const useCartDrawer = () => {
  const [isOpen, setIsOpen] = useAtom(isCartDrawerOpenAtom);
  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);

  return { isOpen, onOpen, onClose };
};

export const useHandlePayment = () => {
  const navigate = useNavigate();
  const search = useAtomValue(getSearchAtom);

  useEffect(() => {
    if (!verifyLocationSearch(search)) return;

    const searchParams = new URLSearchParams(search);
    searchParams.set("checkoutRedirect", "true");
    const redirectSearch = searchParams.toString();

    events.on(EventName.OpenApp, (data: { path: string }) => {
      navigate(data?.path || "/result", {
        state: { ...data, redirectSearch },
      });
    });

    events.on(EventName.OnDataCallback, (data) => {
      const { appTransID, eventType } = data;

      if (appTransID || eventType === "PAY_BY_CUSTOM_METHOD") {
        navigate("/result", {
          state: { ...data, redirectSearch },
        });
      }
    });

    events.on(EventName.PaymentClose, (data = {}) => {
      const { zmpOrderId } = data;

      navigate("/result", {
        state: {
          data: { zmpOrderId },
          redirectSearch,
        },
      });
    });
  }, [search]);
};

export function useToBeImplemented() {
  const snackbar = useSnackbar();
  return () =>
    snackbar.openSnackbar({
      type: "success",
      text: "Chức năng dành cho các bên tích hợp phát triển...",
    });
}

export function useLocalStorageCart() {
  const [cart, setCart] = useAtom(cartAtom);

  useEffect(() => {
    const cartJson = window.localStorage.getItem("cart");
    if (cartJson) {
      const cart: Cart = JSON.parse(cartJson);

      if (cart && cart.items.length > 0) setCart(cart);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
}

export const useAuthInquiryOnStartup = () => {
  const isUserAuthorized = useAtomValue(isUserAuthorizedAtom);
  const setUserInfo = useSetAtom(userInfoAtom);

  useEffect(() => {
    if (isUserAuthorized) return;

    setTimeout(async () => {
      const authResult = await authorize({
        scopes: ["scope.userInfo"],
      });

      if (!authResult["scope.userInfo"]) return;

      const getUserInfoResult = await getUserInfo();
      setUserInfo(getUserInfoResult.userInfo);
    }, 1500);
  }, []);
};
