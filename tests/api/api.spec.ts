import { test, expect } from "@playwright/test";

test.describe("API Endpoint Tests", () => {
  const apiUrl = "https://api.practicesoftwaretesting.com";

  test("GET all products", async ({ request }) => {
    const response = await request.get(apiUrl + "/products");
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    const productsBody = await response.json();
    //expect(products).toBeInstanceOf(Array);
    console.log(productsBody);
    expect(productsBody.data.length).toBe(9);
    expect(productsBody.total).toBe(50);
  });

  test("POST /users/login", async ({ request }) => {
    const response = await request.post(apiUrl + "/users/login", {
      data: {
        email: "customer@practicesoftwaretesting.com",
        password: "welcome01",
      },
    });
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    //expect(responseBody).toHaveProperty("access_token");
    expect(responseBody.access_token).toBeTruthy();
  });

  test.skip("GET single product", async ({ request }) => {
    const response = await request.get(`${apiUrl}/products/1`);
    expect(response.ok()).toBeTruthy();
    const product = await response.json();
    expect(product).toHaveProperty("id", 1);
  });

  test.skip("POST create product", async ({ request }) => {
    const newProduct = {
      name: "New Product",
      price: 99.99,
    };
    const response = await request.post(apiUrl + "/products", {
      data: newProduct,
    });
    expect(response.ok()).toBeTruthy();
    const createdProduct = await response.json();
    expect(createdProduct).toHaveProperty("id");
    expect(createdProduct.name).toBe(newProduct.name);
  });
});
