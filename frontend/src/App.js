import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route,} from 'react-router-dom';
import UserHome from './Components/user/UserHome/UserHome';
import LoginPage from './Components/user/UserHome/AccountLogin/LoginPage'
import SignUpPage from './Components/user/UserHome/AccountLogin/SignUpPage'
import AllProducts from './Components/user/UserHome/AllProducts/AllProducts';
import BluetoothSpeaker from './Components/user/UserHome/BluetoothSpeaker/BluetoothSpeaker';
import Earbud from './Components/user/UserHome/EarBud/Earbud';
import Keyboardmouse from './Components/user/UserHome/KeyBoardMouse/Keyboardmouse';
import Neckband from './Components/user/UserHome/Neckband/Neckband';
import Soundbar from './Components/user/UserHome/SoundBar/Soundbar';
import Smartwatch from './Components/user/UserHome/SmartWatch/Smartwatch';
import ScrollToTop from './Components/ScrollToTop';
import AdLoginPage from './Components/Admin/Login/AdLoginPage';
import ProtectedRoute from './Components/Admin/Login/ProtectedRoute';
import AdminHome from './Components/Admin/AdminHome/AdminHome';
import Bluetooth from './Components/Admin/AdminHome/BluetoothSpeaker/Bluetooth.jsx'
import EarbudItem from './Components/Admin/AdminHome/EarBuds/EarbudItem.jsx'
import KeyboardMouseItem from './Components/Admin/AdminHome/KeyboardMouse/KeyboardMouseItem.jsx';
import NeckbandItem from './Components/Admin/AdminHome/Neckband/NeckbandItem.jsx';
import SoundbarItems from './Components/Admin/AdminHome/Soundbar/SoundbarItems.jsx';
import CreateCollection from './Components/Admin/AdminHome/CreateCollection/CreateCollection.jsx';
import SmartwatchItems from './Components/Admin/AdminHome/Smartwatch/SmartwatchItems.jsx';
import ProductBuy from './Components/user/UserHome/ProductBuy/ProductBuy.jsx';
import MyOrdersPage from './Components/user/UserHome/MyOrders/MyOrdersPage.jsx';
import ProductDetails from './Components/user/UserHome/ProductDetail/ProductDetails.jsx';
import AboutUs from './Components/user/UserHome/AboutUs/AboutUs.jsx';
import ContactUs from './Components/user/UserHome/ContactUs/ContactUs.jsx';
import JustLauched from './Components/user/UserHome/JustLauched/JustLauched.jsx';
import { Elements, loadStripe } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('your-publishable-key-from-stripe');

function App() {
  


  return (
    <>
      
      <Router>
         <ScrollToTop/>
        <Routes>
          ?{/* Home page */}
          <Route path='/' element={<UserHome/>} />{/* UserHome page */}
          <Route path="/Userlogin" element={<LoginPage/>} />{/* UserLogin page */}
          <Route path="/UserSignUp" element={<SignUpPage/>} />{/* UserSignUp page */}
          <Route path='/about'element={<AboutUs/>}/>
          <Route path='/contact'element={<ContactUs/>}/>
          <Route path='/justlaunched'element={<JustLauched/>}/>
          <Route path="/AllProducts" element={<AllProducts/>} />{/* AllProducts page */}
          <Route path="/Bluetoothspeakers" element={<BluetoothSpeaker/>} />{/*  page */}
          <Route path="/Earbuds" element={<Earbud/>} />{/*  page */}
          <Route path="/Keyboardmouse" element={<Keyboardmouse/>} />{/*  page */}
          <Route path="/Neckbands" element={<Neckband/>} />{/*  page */}
          <Route path="/Soundbars" element={<Soundbar/>} />{/*  page */}
          <Route path="/Smartwatches" element={<Smartwatch/>} />{/*  page */}
          <Route path="/products/:id" element={<ProductBuy />} /> {/* Route to Product Buy page */}
          <Route path="/Checkout" element={<ProductBuy />} />
          <Route path="my-orders" element={<MyOrdersPage/>} />
          <Route path="/product/:productId" element={<ProductDetails />} />  {/* Product details page */}
      <Elements stripe={stripePromise}>
      <ProductBuy />
    </Elements>
          
          {/* ADMIN ROUTES */}
         <Route path="/Admin" element={<AdLoginPage/>} />{/* Admin loginpage */}
         <Route path='/admin/login' element={<AdLoginPage />} />
        <Route path='/admin/AdminHome'element={<ProtectedRoute><AdminHome/>
            </ProtectedRoute>}/>
            
            <Route path="/bluetooth" element={<Bluetooth/>} />
            <Route path="/earbuditems" element={<EarbudItem/>} />
            <Route path="/keyboardmouseitems" element={<KeyboardMouseItem/>} />
            <Route path="/neckbandsitems" element={<NeckbandItem/>} />
            <Route path="/soundbarsitems" element={<SoundbarItems/>} />
            <Route path="/smartwatchitems" element={<SmartwatchItems/>} />
            <Route path="/collection/:collectionId" element={<CreateCollection/>} /> 
            
        </Routes>
      </Router>
      
      </>
  );
}

export default App;
