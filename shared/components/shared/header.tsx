"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { cn } from "@/shared/lib/utils";
import {
  AuthModal,
  Container,
  ProfileButton,
} from "@/shared/components/shared";
import Link from "next/link";
import { SearchInput } from "@/shared/components/shared";
import { CartButton } from "@/shared/components/shared";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header: React.FC<Props> = ({
  className,
  hasSearch = true,
  hasCart = true,
}) => {
  const route = useRouter();
  const [openAuthModal, setOpenAuthModal] = React.useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    let toastMessage = "";

    if (searchParams.has("paid")) {
      toastMessage = "Заказ успешно оплачен! Информация отправлена на почту.";
    }

    if (searchParams.has("verified")) {
      toastMessage = "Почта успешно подтверждена!";
    }
    if (toastMessage) {
      setTimeout(() => {
        route.replace("/");
        toast.success(toastMessage, {
          duration: 3000,
        });
      }, 1000);
    }
  }, []);
  return (
    <header className={cn(" border-b", className)}>
      <Container className="flex items-center justify-between py-8">
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" width={35} height={35} alt="Logo" />

            <div>
              <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">
                вкусней уже некуда
              </p>
            </div>
          </div>
        </Link>

        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        {/* Правая часть */}
        <div className="flex items-center gap-3">
          <AuthModal
            open={openAuthModal}
            onClose={() => setOpenAuthModal(false)}
          />

          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
