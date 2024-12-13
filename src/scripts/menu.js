const menuData = [
    {
      category: "Platos Fuertes / Main Dishes / Plats Principaux",
      items: [
        {
          name: "Atún Thai / Thai Tuna",
          price: 10900,
          description: "El más fresco atún aleta amarilla, en una salsa thai de la casa.",
          descriptionEn: "Freshly caught yellowfin tuna topped with our house special Thai sauce.",
          descriptionFr: "Thon Thaï: thon frais dans une sauce Thai de la maison."
        },
        {
          name: "Pasta con Camarones / Shrimp Pasta",
          price: 9900,
          description: "200 gramos de camarón en una salsa de tomate fresco, ajo y crema dulce.",
          descriptionEn: "200 grams of shrimp in a fresh tomato, garlic, and sweet cream sauce.",
          descriptionFr: "Pates aux crevettes: 200gr de crevettes avec une sauce de tomates fraiches, ail et créme fraiche."
        },
        {
          name: "Costilla de Cerdo / Pork Ribs",
          price: 13500,
          description: "500 gramos de costilla tierna de lechón en salsa BBQ de piña.",
          descriptionEn: "500 grams of tender baby back pork ribs topped with our delicious BBQ pineapple sauce."
        },
        {
          name: "Lomito Gorgonzola / Gorgonzola Beef Tenderloin",
          price: 12800,
          description: "200 gramos(7.055 oz) del más suave lomito de res en una salsa de queso gorgonzola.",
          descriptionEn: "200 grams of the most tender beef loin topped with Gorgonzola cheese sauce.",
          descriptionFr: "Longe de boeuf ou Gorgonzola: 200 gr de longe de boeuf très tendre avec une sauce au fromage Gorgonzola."
        },
        {
          name: "Rib-eye",
          price: 16200,
          description: "400 gramos (14.11 oz) del mejor y más jugoso Rib Eye de res, con el mejor chimichurri argentino del mundo.",
          descriptionEn: "The best, the juiciest! Topped with the authentic Argentinian chimichurri sauce.",
          descriptionFr: "400 gr de délicieux faux filet de boeuf, avec le meilleur chimichurri Argentin du monde."
        },
        {
          name: "Churrasco",
          price: 16200,
          description: "400 gramos (14.11 oz) del mejor y más suave churrasco de res con el mejor chimichurri argentino del mundo.",
          descriptionEn: "The juiciest and softest churrasco there is! Topped with authentic Argentinian chimichurri sauce.",
          descriptionFr: "400 gr de churrasco tendre accompagné du meilleur chimichurri Argentin."
        },
        {
          name: "Filet Mignon",
          price: 13500,
          description: "200 gramos (7.055 oz) del más delicioso lomito de res con el mejor chimichurri argentino y tocineta ahumada.",
          descriptionEn: "Beef tenderloin topped with authentic Argentinian chimichurri and smoked bacon.",
          descriptionFr: "200 gr de délicieux filet mignon, chimichurri Argentin et bacon fumé."
        },
        {
          name: "Lomito con camarones / Beef tender loin with shrimp",
          price: 16200,
          description: "200 gramos del más delicioso lomito y camarones en una salsa de Demi-glase.",
          descriptionEn: "200 grams Tender beef loin topped with shrimp in demi-glace sauce.",
          descriptionFr: "Longe de boeuf avec crevettes: 200gr de longe de boeuf et crevettes dans une sauce demi-glace."
        },
        {
          name: "Filet de dorado / Mahi Mahi",
          price: 10900,
          description: "En una salsa tropical de mango y aguacate. Pescado local fresco.",
          descriptionEn: "Fresh local mahi mahi topped with our tropical sauce, made with mango and avocado.",
          descriptionFr: "Filet de dorade avec sauce à la mangue; poisson frais dans une sauce tropicale de mangue et avocat."
        },
        {
          name: "Filet de pollo / Chicken Filet",
          price: 10900,
          description: "Filete de pollo con salsa de hongos frescos.",
          descriptionEn: "Chicken filet topped with delicious fresh mushroom sauce.",
          descriptionFr: "Filet de poulet couvert d'une sauce aux champignons frais."
        }
      ]
    },
    {
      category: "Entradas / Appetizers",
      items: [
        {
          name: "Poke Bowl",
          price: 6900,
          description: "Un bowl relleno de arroz de sushi, mango, aguacate y deliciosos dados de atún fresco marinado con salsa Thai.",
          descriptionEn: "A bowl filled with sushi rice, mango, avocado, and delicious diced fresh tuna marinated in Thai sauce.",
          descriptionFr: "Un bowl rempli de riz à sushi, mangue."
        },
        {
          name: "Tartar de Atún / Tuna Tartare",
          price: 5900,
          description: "Dados de atún fresco, mango y aguacate, marinado con limón y salsa Thai.",
          descriptionEn: "Diced fresh tuna, mango, and avocado marinated in lime juice and Thai sauce.",
          descriptionFr: "Tartare de Thon: dés de thon frais."
        }
      ]
    },
    {
      category: "Wraps / Burritos",
      items: [
        {
          name: "Pollo / Chicken",
          price: 6500,
          description: "Wrap de pollo con lechuga, mango, aguacate y papas salteadas.",
          descriptionEn: "Chicken wrap with lettuce, mango, avocado, and sautéed potatoes."
        },
        {
          name: "Carne / Beef",
          price: 6500,
          description: "Wrap de carne con lechuga, mango, aguacate y papas salteadas.",
          descriptionEn: "Beef wrap with lettuce, mango, avocado, and sautéed potatoes."
        },
        {
          name: "Dorado / Mahi Mahi",
          price: 6500,
          description: "Wrap de dorado a la parrilla con salsa especial y papas salteadas.",
          descriptionEn: "Grilled mahi mahi wrap with special sauce and sautéed potatoes."
        },
        {
          name: "Atún / Tuna",
          price: 6500,
          description: "Wrap de atún fresco con aguacate y papas salteadas.",
          descriptionEn: "Fresh tuna wrap with avocado and sautéed potatoes."
        }
      ]
    },
    {
      category: "Hamburguesas / Hamburgers",
      items: [
        {
          name: "Pollo / Chicken",
          price: 6900,
          description: "Hamburguesa de pollo con lechuga, tomate, aguacate, mango y tocineta, acompañado de papas salteadas.",
          descriptionEn: "Chicken burger with lettuce, tomato, avocado, mango, and bacon, served with sautéed potatoes.",
          descriptionFr: "Tortilla de blé, laitue, tomate, avocat, mangue et bacon, accompagné de pommes de terre sautées."
        },
        {
          name: "Carne / Beef",
          price: 6900,
          description: "Hamburguesa de carne con lechuga, tomate, aguacate, mango y tocineta, acompañado de papas salteadas.",
          descriptionEn: "Beef burger with lettuce, tomato, avocado, mango, and bacon, served with sautéed potatoes.",
          descriptionFr: "Tortilla de blé, laitue, tomate, avocat, mangue et bacon, accompagné de pommes de terre sautées."
        },
        {
          name: "Dorado / Mahi Mahi",
          price: 6900,
          description: "Hamburguesa de dorado a la parrilla con lechuga, tomate, aguacate y papas salteadas.",
          descriptionEn: "Grilled mahi mahi burger with lettuce, tomato, avocado, and sautéed potatoes.",
          descriptionFr: "Tortilla de blé, laitue, tomate, avocat, mangue et bacon, accompagné de pommes de terre sautées."
        },
        {
          name: "Atún / Tuna",
          price: 6900,
          description: "Hamburguesa de atún fresco con lechuga, aguacate, cebolla morada y papas salteadas.",
          descriptionEn: "Fresh tuna burger with lettuce, avocado, red onion, and sautéed potatoes.",
          descriptionFr: "Tortilla de blé, laitue, avocat, oignon rouge, accompagné de pommes de terre sautées."
        }
      ]
    },
    {
      category: "Bebidas Naturales / Natural Drinks",
      items: [
        {
          name: "Piña",
          price: 1500
        },
        {
          name: "Guanábana",
          price: 1500
        },
        {
          name: "Limonada con Hierbabuena",
          price: 1500
        },
        {
          name: "Maracuyá",
          price: 1500
        }
      ]
    },
    {
      category: "Bebidas Gaseosas / Soft Drinks",
      items: [
        {
          name: "Coca-Cola",
          price: 1300
        },
        {
          name: "Fanta",
          price: 1300
        },
        {
          name: "Fresca",
          price: 1300
        }
      ]
    }
  ];