# Projenin Yükleme Aşaması Ve indirilmesi gereken npm packagelar

<ul>
<ol>Öncelikle projemizin hangi isimde olmasını istiyorsak o isimde istediğimiz bir dizin de klosör açıyoruz.</ol>
<ol>Dosyamızı visual Stdio da açıyoruz.</ol>
<ol>Daha sonra npx create-react-app (projenin ismi) komutunu cmd de çalıştırıyoruz.</ol>
<ol>db.json yani sanal apimizi bir dosyanın içine atıyoruz.O dosyanın dizinini kopyalayıp cd (yapıştır)</ol>
<ol>json-server --watch db.json diyerek apimizi projemizde çalıştırıyoruz.</ol>
<ol>npm start diyerek proje çalıştırılır. Ve projemiz yayına alınmış oldu</ol>
<ol>npm i redux diyerek redux eklenir</ol>
<ol>np i react-redux denilerek react için redux kurulur.</ol>
<ol>npm i reactstrap diyerek bootstrapi kullanmak için yüklüyoruz.</ol>
<ol>npm i bootstrap diyerek de bootstrapi projeye dahil ediyoruz.</ol>
<ol>npm i react-thunk diyerek daha sonra thunk da bulunan applyMiddleware kullanmak için indiriyoruz.</ol>
<ol>fa iconunun linkini index.html e ekledik.</ol>
<ol>reactstrapi kullanmak için import 'bootstrap/dist/css/bootstrap.min.css'; diyerek bunu index.js e ekliyoruz.</ol>
<ol>Bir klosör yapısı oluşturuyoruz.içinde Component ve redux bulunduracak şekilde.</ol>
</ul>
<h3>Kurulum sonucunda elde edilenler</h3>
<ul>
<li>Kurulum sonucun da react,redux,react-redux,reactstrap,bootstrap ve fa icon kurulmuş oldu. </li>
<li>Klosörleme işlemi yaptık ve gerekli yerlere gerekli importlar yapıldı.</li>
<li>Dashboardın içinde category ve product bulunacak şekilde eklendi (product->col-9 , category-> col-3)</li>
<li>Dashboard app in içinde container divi kullanılarak eklendi ayrıca naviyi de reacstrap ile etkinleştirip kullandık.</li>
</ul>

# actionTypeların yazılması:

<ul>
<ol>ActionType: Her Componentin bir işlevi ve görevi vardır. Örneğin category componenti için işlev , basıldığı an ürünlerin o categorye göre değişmesidir.<ol>
<ol>Bu gibi işlemleri tanımlamak için actionTypelar kullanılır ve bunları const ile tanımlarız daha sonra export ederiz.</ol>
<ol>Örnek bir tanımlama<br/>
export const CHANGE_CATEGORY = 'CHANGE_CATEGORY';
</ol>
</ul>

# Actionların yazılması:

<ul>
<ol>Action.type: içerisin de iki adet parametre barındırır. Birisi action.type az önce anlattığımız isimlendirmelerdi.</ol>
<ol>Action.payload: O aksyonun seçildiğinde alacağı değeri belirtir.</ol>
<ol>Hangi aksyonun seçildiğini aksyon tipleri ile anlarken o aksonun değeri yani datasını da payloadlar belli eder.</ol>
<ol>Örnek bir action yazılması (actionlar her component için ayrı ayrı yazılır.)
<br/>
export function changeCategory(category){
    return{
        type: actionTypes.CHANGE_CATEGORY,
        payload:category
    }
}
</ol>
</ul>

# Reducerın Yazılması:

<ul>
<ol>Redux: Redux daki en büyük olay bütün componentlerin verilere tek bir yerden ulaşabilmesidir.</ol>
<ol>Reducer: Ulaşılacak olan verilerin yani statlerin yönetilmesi konusun da yazılan koşullardır.</ol>
<ol>Seçilen aksyona göre yapılacak işlem yapılır ve yeni state oluşur daha sonra o state döndürülür.</ol>
<ol>Reducerlar genellikle swtich-case blokları arasına yazılır. Ve defaul değerini belirlemek için de bir başlangıç state durumu belirlenir.</ol>
<ol>Örnek bir initialState <br/>
export default {
    currentCategory: {}
}
</ol>
<ol>Örnek bir reducer yazılması (reducerlar her component için ayrı ayrı yazılır.)
<br/>
export default function changeCategoryReducer(
  state = initialState.currentCategory,
  action
) {
  switch (action.type) {
    case actionTypes.changeCategory:
      return action.payload;
    default:
      state;
  }
}
</ol>
</ul>

# Redux Store Konfigurasyonu: (Combine Reducers)

<ul>
<ol>Redux Store : reduxın içindeki actionları ve bu actionları kullnamamız için yazdığımız reducerı da kullanmak için bir mağaza (store) oluştumamız gerekmektedir. Daha sonra bu mağaza ile projemizi sarmallayacğız.</ol>
<ol>Combine Reducer : Yazdığımız bütün reducerları aynı çarı altında toplamak için kullanıdığımız bir metotdur.</ol>
<ol>Örnek bir combine reducer yazımı : <br/>
    const rootReducer = combineReducers({
  changeCategoryReducer: changeCategoryReducer // bütün reducerları aynı çatı altında combine ediyoruz.
});
export default rootReducer;
</ol>
<ol>ConfigureStore : Aynı çatı altında topladığımız reducerlar ile bir mağaza açıyoruz. Örnek bir mağaza oluşumu <br/>
import {createStore} from 'redux';
import rootReducer from './index';

export default function configureStore(){
return createStore(rootReducer)  
}

</ol>
<ol>Son olarak oluşturduğumuz mağazamızı kullanmak ve bu mağazayı tüm proje de kullanmak için uygulamamızın ana dizinin deki index dosyasını bu mağaza ile sarmallıyoruz.<br/>
import Provider from 'react-redux';
import configureStore from './redux/reducers/configureStore';
const store = configureStore();
     <Provider store={store}>
    <App />
    </Provider>
</ol>
<ol>Uygulamamız tamamen reduxa bağlanmış oldu.</ol>
</ul>

# Componentleri Store a Connect etme işlemi :

<ul>
<ol>Oluşturmuş olduğumuz reduxı kullanmak için mapStateToPorps fonksyonu yazarak kullanıyoruz.</ol>
<ol>
import {connect} from 'react-redux';
function mapStateToProps(state){
    return{
        currentCategory:state.changeCategoryReducer
    }
}
export default connect(mapStateToProps)(CategoryList)
</ol>
<ol>Seçili Kategori :{this.props.currentCategory.categoryName}</ol>
<ol>Oluşan reducerdaki statei propsa aktarıyor ve orda kullanıyoruz.</ol>
</ul>

# Categorileri Bastırmak için yaptığımız işlemler:

<ul>
  <ol>Öncelikle bir fetch , post,put veya delete işlemi yapacağımızda yani bir action gerçekleştireceğimizde yapmamız gereken işlemler kurulumlardan sonra hep aynıdır.</ol>
  <ol>1.Olarak CategoryActionsın içine categorileri getirecek olan fetch fonksyonunu yazıyoruz.<br/>
      export function getCategories() {
  return function (dispatch) {
    let url = "http://localhost:3000/categories";
    return fetch(url)
      .then((response) => response.json())
      .then((result) => dispatch(getCategoriesSuccess(result)));
  };
  </ol>
  <ol>Daha sonra bu yazdığımız kodu reducera gönderip state değiştirmeden önce payload ve action.type işlemleri için bir fonksyon daha yazıyoruz.</ol>
  <ol><br/>
  export function getCategoriesSuccess(categories) {
  return { type: actionTypes.GET_CATEGORIES_SUCCESS, payload: categories };
  }
</ol>
  <ol>Ardından reducerda Action.type.GET_CATEGORIES_SUCCESS Olan durumu kullanmak için CategoryLİst adında bir reducer yazıyoruz. </ol>
  <ol><br/>
import * as actionTypes from "../actions/actionTypes";
import initialState from "../reducers/initialState";

export default function changeCategoryReducer(
state = initialState.categories,
action
) {
switch (action.type) {
case actionTypes.GET_CATEGORIES_SUCCESS:
return action.payload;
default:
return state;
}
}

  </ol>
  <ol>Yeni bir reducer yazdığımız da onu hemen gidip tüm reducerları aynı çatı altına topladığımız Combine Reducer altında topluyoruz.
    <br/>
  const rootReducer = combineReducers({
  changeCategoryReducer: changeCategoryReducer,// bütün reducerları aynı çatı altında combine ediyoruz.
  categoryListReducer: categoryListReducer
});

export default rootReducer;

  </ol>
<ol>Componentimizin içinde categoriler ile güncellediğimiz statei kullanmak için mapDispatchToProps fonksyonu yazıyoruz.<br/>
  function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getCategories: bindActionCreators(categoryAction.getCategories, dispatch),
      changeCategory:bindActionCreators(categoryAction.changeCategory, dispatch)
    },
  };
}
</ol>
<ol>Bu fonksyon bize en başta fetch ettiğimiz getcategory ismindeki fonksyonu çağırdı o da gidip actionTypes ları ve payloadu ayarladı ve sonra redux yazığımız reducer ile state i güncelledi. Onu prop olarak componentin proplarına geçirdik.</ol>
<ol>Tabi bu sırada thunkı da kullanmak için configureStore da bazı değişikler yaptık.<br/>
export default function configureStore(){
    return createStore(rootReducer,applyMiddleware(thunk));             
}
</ol>
<ol>Componentin propsunu ilgili yerde reactstrap kullanarak bastırdık.</ol>
</ul>

# Put ve Post işlemlerini yapmak :

<ul>
  <ol>Herzaman ki gibi önce action Typlarını yazdık.<br>
    export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
    export const UPTADE_PRODUCT_SUCCESS = 'UPTADE_PRODUCT_SU'
  </ol>
  <ol>Daha sonra Actionları yazmamız gerekiyor.<br>
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
  
  </ol>
  <ol>Daha sonrasında ise reducerı yazmamız gerekiyor.O da her zamanki gibi actiontypına göre gelen payloadı bir state'e çeviriyor.</ol>
  <ol></ol>
  <ol></ol>
  <ol></ol>
</ul>

# Kısa yollar vs code için:

<ul>
<li>ctrl+p -> arama yapıp dosya bulmak için</li>
<li>ctrl+d -> aynı satırdan aşağa indirmek</li>
<li>ctrl+k+d -> format yapmak için</li>
<li>ctrl+k+c -> commentlemek için</li>
<li>ctrl+k+u -> uncommet</li>
<li>ctrl+space -> intelicense açmak için</li>
<li>shift+alt+f -> boşlukları silmek için</li>
</ul>
//D:\çalışmalarım\React Uygulamalar\northWind\northwind\api
