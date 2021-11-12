import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import app from '../../firebase';
import { addProduct } from '../../redux/apiCalls';
import './newProduct.css';

const NewProduct = () => {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [perc, setPerc] = useState(null);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
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
    const { title, desc, categories, color, size, inStock, price } = inputs;
    if (
      !title ||
      !file ||
      !desc ||
      !categories ||
      !price ||
      !color ||
      !size ||
      !inStock
    ) {
      setError(true);
      return;
    }

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
        setPerc(progress);

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
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setIsUploading(false);
          setInputs((prev) => {
            return { ...prev, img: downloadURL };
          });
          setUploaded(true);
        });
      }
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(inputs, dispatch);
    history.push('/productList');
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setError(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [error]);

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <p className="error">{error && `You must fill all the fields!`}</p>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Title</label>
          <input
            name="title"
            type="text"
            placeholder="name"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            name="desc"
            type="text"
            placeholder="description..."
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            placeholder="100"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <select
            name="categories"
            id="active"
            multiple
            onChange={handleSelect}
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="kids">Kids</option>
            <option value="Dresses">Dresses</option>
            <option value="jackets">Jackets</option>
            <option value="T-shirts">T-shirts</option>
            <option value="Coat">Coat</option>
          </select>
        </div>
        <div className="addProductItem">
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
        <div className="addProductItem">
          <label>Color</label>
          <select name="color" id="active" multiple onChange={handleSelect}>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
            <option value="red">Red</option>
            <option value="yellow">Yellow</option>
            <option value="pink">Pink</option>
            <option value="grey">Grey</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        {uploaded ? (
          <button className="addProductButton" onClick={handleSubmit}>
            Done
          </button>
        ) : (
          <button className="addProductButton" onClick={handleUpload}>
            {!isUploading ? 'Create' : `Creating... `}
            {perc && `${Math.round(perc)} %`}
          </button>
        )}
      </form>
    </div>
  );
};

export default NewProduct;
