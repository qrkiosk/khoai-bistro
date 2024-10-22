import { useEffect, useRef, useState } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { authorize, EventName, events, getUserInfo } from "zmp-sdk";
import { useNavigate, useSnackbar } from "zmp-ui";

import { Cart } from "../types/cart";
import { matchStatusBarColor } from "../utils/device";
import { cartAtom, isUserAuthorizedAtom, userInfoAtom } from "../state";

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

export const useHandlePayment = () => {
  const navigate = useNavigate();

  useEffect(() => {
    events.on(EventName.OpenApp, (data) => {
      if (data?.path) {
        navigate(data?.path, { state: data });
      }
    });

    events.on(EventName.OnDataCallback, (res) => {
      const { appTransID, eventType } = res;

      if (appTransID || eventType === "PAY_BY_CUSTOM_METHOD") {
        navigate("/result", { state: res });
      }
    });

    events.on(EventName.PaymentClose, (data = {}) => {
      const { zmpOrderId } = data;

      navigate("/result", {
        state: {
          data: { zmpOrderId },
        },
      });
    });
  }, []);
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

export function useAuthInquiryOnStartup() {
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
}
