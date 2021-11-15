import { useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
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
  const [uploaded, setUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const history = useHistory();
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
  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) {
      handleSubmit(e);
    }
    if (file) {
      setIsUploading(true);
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
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setIsUploading(false);
            setInputs((prev) => {
              return { ...prev, img: downloadURL };
            });
            setUploaded(true);
          });
        }
      );
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(inputs).length === 0 && !file) return;
    updateProduct(productId, inputs, dispatch);
    history.push('/productList');
    window.location.reload();
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
            <img src={product?.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">ID:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Description:</span>
              <span className="productInfoValue">{product.desc}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Price:</span>
              <span className="productInfoValue">${product.price}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Categories:</span>
              {product.categories.map((cat, i) => (
                <span className="productInfoValue" key={i}>
                  {i === product.categories.length - 1 ? cat : cat + ','}
                </span>
              ))}
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Size:</span>
              {product.size.map((s, i) => (
                <span className="productInfoValue" key={i}>
                  {i === product.size.length - 1 ? s : s + ','}
                </span>
              ))}
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Colors:</span>
              {product.color.map((col, i) => (
                <span className="productInfoValue" key={i}>
                  {i === product.color.length - 1 ? col : col + ','}
                </span>
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
                name="title"
                placeholder={product.title}
                onChange={handleChange}
              />
            </div>
            <div className="productFormItem">
              <label>Product Price</label>
              <input
                type="text"
                name="price"
                placeholder={product.price}
                onChange={handleChange}
              />
            </div>
            <div className="productFormItem">
              <label>Product description</label>
              <input
                type="text"
                name="desc"
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
                name="categories"
                id="active"
                multiple
                onChange={handleSelect}
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
                <option value="Dresses">Dresses</option>
                <option value="Jackets">Jackets</option>
                <option value="T-shirts">T-shirts</option>
                <option value="Coat">Coat</option>
              </select>
            </div>

            <div className="productFormItem">
              <label>Size</label>
              <select name="size" id="active" multiple onChange={handleSelect}>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>
            <div className="productFormItem">
              <label>Color</label>
              <select name="color" id="active" multiple onChange={handleSelect}>
                <option value="green">Green</option>
                <option value="white">White</option>
                <option value="blue">Blue</option>
                <option value="red">Red</option>
                <option value="yellow">Yellow</option>
                <option value="pink">Pink</option>
                <option value="grey">Black</option>
                <option value="grey">Grey</option>
              </select>
            </div>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />
              <label htmlFor="file">
                <PublishIcon className="uploadIcon" />
              </label>
              <input
                type="file"
                id="file"
                style={{ display: 'none' }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            {uploaded ? (
              <button className="productButton" onClick={handleSubmit}>
                Done
              </button>
            ) : (
              <button
                className="productButton"
                onClick={!uploaded ? handleUpload : handleSubmit}
              >
                {!isUploading ? 'Update' : `Uploading... `}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Product;
