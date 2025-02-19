import { useNavigate, useParams } from "react-router";
import myContext from "../../context/myContext";
import { useContext, useEffect, useState } from "react";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";

const categoryList = [
    { name: 'fashion' },
    { name: 'shirt' },
    { name: 'jacket' },
    { name: 'mobile' },
    { name: 'laptop' },
    { name: 'shoes' },
    { name: 'home' },
    { name: 'books' }
];

const UpdateProductPage = () => {
    const context = useContext(myContext);
    const { loading, setLoading, getAllProductFunction } = context;

    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id);

    // product state
    const [product, setProduct] = useState({
        title: "",
        price: "",
        productImageUrl: "",
        category: "",
        description: "",
        quantity: "",
        time: Timestamp.now(),
        date: new Date().toLocaleDateString("en-US")
    });

    // Get Single Product Function
    const getSingleProductFunction = async () => {
        setLoading(true);
        try {
            const productTemp = await getDoc(doc(fireDB, "products", id));
            if (productTemp.exists()) {
                const product = productTemp.data();
                setProduct({
                    title: product?.title || '',
                    price: product?.price || '',
                    productImageUrl: product?.productImageUrl || '',
                    category: product?.category || '',
                    description: product?.description || '',
                    quantity: product?.quantity || '',
                    time: product?.time || Timestamp.now(),
                    date: product?.date || new Date().toLocaleDateString("en-US")
                });
            } else {
                toast.error("Product not found");
            }
        } catch (error) {
            console.log(error);
            toast.error("Error fetching product");
        } finally {
            setLoading(false);
        }
    };

    // Update Product Function
    const updateProduct = async () => {
        setLoading(true);
        try {
            await setDoc(doc(fireDB, 'products', id), product);
            toast.success("Product updated successfully");
            if (getAllProductFunction) {
                getAllProductFunction(); // Update the product list if the function is defined
            } else {
                console.error("getAllProductFunction is not available.");
            }
            navigate('/admin-dashboard'); // Redirect to the admin dashboard after success
        } catch (error) {
            console.log(error);
            toast.error("Error updating product");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            getSingleProductFunction();
        }
    }, [id]);

    // Form input change handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div>
            <div className="flex justify-center items-center h-screen">
                {loading && <Loader />}
                <div className="login_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md">
                    <div className="mb-5">
                        <h2 className='text-center text-2xl font-bold text-pink-500'>
                            Update Product
                        </h2>
                    </div>

                    {/* Input Fields */}
                    <div className="mb-3">
                        <input
                            type="text"
                            name="title"
                            value={product.title}
                            onChange={handleChange}
                            placeholder="Product Title"
                            className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            placeholder="Product Price"
                            className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="text"
                            name="productImageUrl"
                            value={product.productImageUrl}
                            onChange={handleChange}
                            placeholder="Product Image URL"
                            className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
                        />
                    </div>

                    <div className="mb-3">
                        <select
                            name="category"
                            value={product.category}
                            onChange={handleChange}
                            className="w-full px-1 py-2 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none"
                        >
                            <option disabled>Select Product Category</option>
                            {categoryList.map((value, index) => (
                                <option key={index} value={value.name}>
                                    {value.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <textarea
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            placeholder="Product Description"
                            rows="5"
                            className="w-full px-2 py-1 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none placeholder-pink-300"
                        />
                    </div>

                    <div className="mb-3">
                        <button
                            onClick={updateProduct}
                            type="button"
                            className="bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md"
                        >
                            Update Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProductPage;
