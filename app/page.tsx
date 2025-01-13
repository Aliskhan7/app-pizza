import { Container, Filters, Title, TopBar } from "@/components/shared";
import { ProductsGroupList } from "@/components/shared/product-group-list";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>
      <TopBar />
      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          <div className="w-[250px]">
            <Filters />
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList
                title="Пиццы"
                items={[
                  {
                    id: 1,
                    name: "Маргарита",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                    price: 550,
                    items: [{ price: 444 }],
                  },
                  {
                    id: 2,
                    name: "Маргарита",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                    price: 550,
                    items: [{ price: 444 }],
                  },
                  {
                    id: 3,
                    name: "Маргарита",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                    price: 550,
                    items: [{ price: 444 }],
                  },
                  {
                    id: 4,
                    name: "Маргарита",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                    price: 550,
                    items: [{ price: 444 }],
                  },
                  {
                    id: 5,
                    name: "Маргарита",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                    price: 550,
                    items: [{ price: 444 }],
                  },
                ]}
                categoryId={1}
              />
              <ProductsGroupList
                title="Комбо"
                items={[
                  {
                    id: 1,
                    name: "Маргарита",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                    price: 550,
                    items: [{ price: 444 }],
                  },
                  {
                    id: 2,
                    name: "Маргарита",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                    price: 550,
                    items: [{ price: 444 }],
                  },
                  {
                    id: 3,
                    name: "Маргарита",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                    price: 550,
                    items: [{ price: 444 }],
                  },
                  {
                    id: 4,
                    name: "Маргарита",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                    price: 550,
                    items: [{ price: 444 }],
                  },
                  {
                    id: 5,
                    name: "Маргарита",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                    price: 550,
                    items: [{ price: 444 }],
                  },
                  {
                    id: 6,
                    name: "Маргарита",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                    price: 550,
                    items: [{ price: 444 }],
                  },
                ]}
                categoryId={2}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
