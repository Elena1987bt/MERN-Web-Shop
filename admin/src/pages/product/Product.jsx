import { Link, useLocation } from 'react-router-dom';
import Chart from '../../components/chart/Chart';
import { useSelector } from 'react-redux';
import { productData } from '../../dummyData';
import PublishIcon from '@mui/icons-material/Publish';
import './product.css';

const Product = () => {
  const location = useLocation();
  const productId = location.pathname.split('/')[2];
  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );
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
                <span className="productInfoValue">{category}</span>
              ))}
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Size:</span>
              {product.size.map((s) => (
                <span className="productInfoValue">{s}</span>
              ))}
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Colors:</span>
              {product.color.map((col) => (
                <span className="productInfoValue">{col}</span>
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
              <input type="text" placeholder={product.title} />
            </div>
            <div className="productFormItem">
              <label>Product Price</label>
              <input type="text" placeholder={product.price} />
            </div>
            <div className="productFormItem">
              <label>Categories</label>
              <select name="content" id="active" multiple>
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
              <label>Color</label>
              <select name="active" id="active" multiple>
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
              <select name="active" id="active" multiple>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
                <option value="red">Red</option>
                <option value="yellow">Yellow</option>
                <option value="pink">Pink</option>
                <option value="grey">Grey</option>
              </select>
            </div>
            <div className="productFormItem">
              <label>In Stock</label>
              <select name="inStock" id="idStock">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />
              <label for="file">
                <PublishIcon />
              </label>
              <input type="file" id="file" style={{ display: 'none' }} />
            </div>
            <button className="productButton">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Product;
