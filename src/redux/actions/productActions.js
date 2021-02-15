import * as actionTypes from "./actionTypes";

export function getProductsSuccess(products) {
  return { type: actionTypes.GET_PRODUCTS_SUCCESS, payload: products };
}

export function createProductSuccess(product) {
  return { type: actionTypes.CREATE_PRODUCT_SUCCESS, payload: product };
}

export function uptadeProductSuccess(product) {
  return { type: actionTypes.UPTADE_PRODUCT_SUCCESS, payload: product };
}

export function saveProductApi(product) { // Post veya Put olarak (Ekle veya güncelle) işlemleri için talimat geldiğinde apşye haber veren fonksyon
  return fetch("http://localhost:3000/products/" + (product.id || ""), { 
    //Eğer ürünün idsi geldi ve bu kullanılmak isteniyorsa bu bir güncelleme(Put) işlemidir.Ancak id gelmedi ise sıfırdan yeni bir ürün eklenecektir.
    method: product.id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(product), // Adresi bellirledikten sonra datayı gönderiyoruz.Datamız json tipindeki veriyi stringe çevirdik.
  })
    .then(handleResponse) 
    .catch(handleError);
}

export function saveProduct(product) { //Api operasyonunu çağıran ve daha sonrasında thunk ile actionları çağırıp payloadlarını belirliyoruz.
  return function (dispatch) {
    return saveProductApi(product)
      .then((savedProduct) => {
        product.id                //Product id varsa
          ? dispatch(uptadeProductSuccess(savedProduct)) // Şu aksyonu çalıştır.
          : dispatch(createProductSuccess(savedProduct)); // Değilse bu bir eklemedir ve bu aksyonu çalıştır.
      })
      .catch((error) => {
        throw error;
      });
  };
}

export async function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }
  const error = await response.text();
  throw new Error(error);
}

export function handleError(error) {
  console.error("Bir hata oluştu.");
  throw error;
}

export function getProducts(currentCategory) {
  return function (dispatch) {
    let url = "http://localhost:3000/products";
    if (currentCategory) {
      url = url + "?categoryId=" + currentCategory;
    }
    return fetch(url)
      .then((response) => response.json())
      .then((result) => dispatch(getProductsSuccess(result)));
  };
}
