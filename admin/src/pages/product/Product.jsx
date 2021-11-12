import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Chart from '../../components/chart/Chart';
import { useSelector, useDispatch } from 'react-redux';
import { productData } from '../../dummyData';
import PublishIcon from '@mui/icons-material/Publish';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import app from '../../firebase';
import { updateProduct } from '../../redux/apiCalls';
import './product.css';

const Product = () => {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const location = useLocation();
  const productId = location.pathname.split('/')[2];
  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setInputs((prev) => {
      return { ...prev, [e.target.name]: value };
    });
  };
  const handleClick = (e) => {
    e.preventDEfault();
    if (file) {
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, `images/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const product = { ...inputs, img: downloadURL };
            updateProduct(productId, product, dispatch);
          });
        }
      );
    } else {
      updateProduct(productId, inputs, dispatch);
    }
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newProduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={productData} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">ID:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Price:</span>
              <span className="productInfoValue">${product.price}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Categories:</span>
              {product.categories.map((category) => (
                <span className="productInfoValue">{category},</span>
              ))}
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Size:</span>
              {product.size.map((s) => (
                <span className="productInfoValue">{s},</span>
              ))}
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Colors:</span>
              {product.color.map((col) => (
                <span className="productInfoValue">{col},</span>
              ))}
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">In stock:</span>
              <span className="productInfoValue">
                {product.inStock ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <div className="productFormItem">
              <label>Product Name</label>
              <input
                type="text"
                placeholder={product.title}
                onChange={handleChange}
              />
            </div>
            <div className="productFormItem">
              <label>Product Price</label>
              <input
                type="text"
                placeholder={product.price}
                onChange={handleChange}
              />
            </div>
            <div className="productFormItem">
              <label>Product description</label>
              <input
                type="text"
                placeholder={product.desc}
                onChange={handleChange}
              />
            </div>
            <div className="productFormItem">
              <label>In Stock</label>
              <select name="inStock" id="idStock" onChange={handleChange}>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="productFormItem">
              <label>Categories</label>
              <select
                name="content"
                id="active"
                multiple
                onChange={handleSelect}
              >
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kids">Kids</option>
                <option value="dresses">Dresses</option>
                <option value="jackets">Jackets</option>
                <option value="t-shirts">T-shirts</option>
                <option value="coat">Coat</option>
              </select>
            </div>

            <div className="productFormItem">
              <label>Size</label>
              <select
                name="active"
                id="active"
                multiple
                onChange={handleSelect}
              >
                <option value="xs">XS</option>
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
                <option value="xl">XL</option>
                <option value="xxl">XXL</option>
              </select>
            </div>
            <div className="productFormItem">
              <label>Color</label>
              <select
                name="active"
                id="active"
                multiple
                onChange={handleSelect}
              >
                <option value="green">Green</option>
                <option value="blue">Blue</option>
                <option value="red">Red</option>
                <option value="yellow">Yellow</option>
                <option value="pink">Pink</option>
                <option value="grey">Grey</option>
              </select>
            </div>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />
              <label for="file">
                <PublishIcon className="uploadIcon" />
              </label>
              <input
                type="file"
                id="file"
                style={{ display: 'none' }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <button className="productButton" onClick={handleClick}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Product;
