import { Container, Title } from "@/shared/components/shared";
import React from "react";

export const ChackoutPage = () => {
  return (
        <Container className="mt-5">
          <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]" />


          
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex gap-10">
                {/* Левая часть */}
                <div className="flex flex-col gap-10 flex-1 mb-20">
                  <CheckoutCart
                    onClickCountButton={onClickCountButton}
                    removeCartItem={removeCartItem}
                    items={items}
                    loading={loading}
                  />

                  <CheckoutPersonalForm className={loading ? 'opacity-40 pointer-events-none' : ''} />

                  <CheckoutAddressForm className={loading ? 'opacity-40 pointer-events-none' : ''} />
                </div>

                {/* Правая часть */}
                <div className="w-[450px]">
                  <CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting} />
                </div>
              </div>
            </form>
          </FormProvider>
        </Container>
    );
};

