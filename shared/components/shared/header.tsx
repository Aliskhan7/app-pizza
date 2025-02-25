import React from "react";
import Image from "next/image";
import { cn } from "@/shared/lib/utils";
import { User } from "lucide-react";
import { Container } from "@/shared/components/shared";
import { Button } from "@/shared/components/ui";
import Link from "next/link";
import { SearchInput } from "@/shared/components/shared";
import { CartButton } from "@/shared/components/shared";
interface Props {
  className?: string;
}
export const Header: React.FC<Props> = ({ className }) => {
  return (
    <header className={cn("border border-b", className)}>
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

        <div className="mx-10 flex-1">
          <SearchInput />
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="items-center flex gap-3">
            <User size={16} />
            Войти
          </Button>

          <div>
            <CartButton />
          </div>
        </div>
      </Container>
    </header>
  );
};
