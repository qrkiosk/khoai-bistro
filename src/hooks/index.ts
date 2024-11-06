import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { authorize, EventName, events, getUserInfo } from "zmp-sdk";
import { useNavigate, useSnackbar } from "zmp-ui";
import { useBoolean } from "@chakra-ui/react";

import { delay } from "../utils";
import { matchStatusBarColor } from "../utils/device";
import { verifyLocationSearch } from "../utils/product";
import { cancelMerchantSideOrder } from "../api/order";
import {
  isCartDrawerOpenAtom,
  isUserAuthorizedAtom,
  userInfoAtom,
  getSearchAtom,
  clearCartAtom,
  tableInfoAtom,
  storeInfoAtom,
  postCheckoutDataAtom,
} from "../state";

export const useResetCart = () => {
  const clearCart = useSetAtom(clearCartAtom);
  useEffect(() => {
    clearCart();
  }, []);
};

export const useRenderFromCOResult = () => {
  const [isLoading, { on, off }] = useBoolean(false);
  const { search } = useLocation();

  useEffect(() => {
    const isRedirectedFromCOResult =
      new URLSearchParams(search).get("checkoutRedirect") === "true";

    if (isRedirectedFromCOResult) {
      on();
      delay(600).then(off);
    }
  }, [search]);

  return isLoading;
};

export const useDelayedRender = (delayInMs: number) => {
  const [shouldRender, { on: triggerRendering }] = useBoolean(false);

  useEffect(() => {
    delay(delayInMs).then(triggerRendering);
  }, []);

  return shouldRender;
};

export const useIsLoadedTableOrStore = () => {
  const { data: tableInfo, isLoading: isFetchingTable } =
    useAtomValue(tableInfoAtom);
  const { data: storeInfo, isLoading: isFetchingStore } =
    useAtomValue(storeInfoAtom);

  return (
    !isFetchingTable &&
    tableInfo != null &&
    !isFetchingStore &&
    storeInfo != null
  );
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
  const postCheckoutData = useAtomValue(postCheckoutDataAtom);
  const orderId = postCheckoutData?.orderId;

  useEffect(() => {
    if (!verifyLocationSearch(search)) return;

    const searchParams = new URLSearchParams(search);
    searchParams.set("checkoutRedirect", "true");
    const redirectSearch = searchParams.toString();

    events.off(EventName.OpenApp);
    events.on(EventName.OpenApp, (data: { path: string }) => {
      console.log("EventName.OpenApp", data);
      navigate(data?.path || "/result", {
        replace: true,
        state: { ...data, redirectSearch },
      });
    });

    events.off(EventName.OnDataCallback);
    events.on(EventName.OnDataCallback, async (data) => {
      console.log("EventName.OnDataCallback", data, orderId);
      if (!data && !!orderId) {
        await cancelMerchantSideOrder({
          id: orderId,
          reason: "Incomplete payment process",
        });
        return;
      }

      const { appTransID, eventType } = data;
      if (appTransID || eventType === "PAY_BY_CUSTOM_METHOD") {
        navigate("/result", {
          replace: true,
          state: { ...data, redirectSearch },
        });
      }
    });

    events.off(EventName.PaymentClose);
    events.on(EventName.PaymentClose, (data = {}) => {
      console.log("EventName.PaymentClose", data);
      const { zmpOrderId } = data;

      navigate("/result", {
        replace: true,
        state: {
          data: { zmpOrderId },
          redirectSearch,
        },
      });
    });
  }, [search, orderId]);
};

export function useToBeImplemented() {
  const snackbar = useSnackbar();
  return () =>
    snackbar.openSnackbar({
      type: "success",
      text: "Chức năng dành cho các bên tích hợp phát triển...",
    });
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
