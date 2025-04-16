import { useEffect, useState } from "react";
import { RiAddCircleLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/public/product/all-products`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        console.log("response123: ", result);
        setProducts(result);
      } catch (err) {
        //   setError(err.message);
      } finally {
        //   setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full h-screen overflow-x-hidden   p-7 bg-white">
    
    <div className="mb-6 flex items-center justify-between">
      <h2 className="text-3xl font-bold flex flex-col items-center justify-center text-gray-800">All Products</h2>
      <Link to="/add-product">
        <button className=""><RiAddCircleLine className="w-7 h-7" /></button>
      </Link>
    </div>
  
   
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:px-16 gap-8">
      {[...products].reverse().map((product, index) => (
        <div
          key={product.productId}
          className="bg-white border border-gray-400 rounded-lg shadow-md p-4 flex flex-col gap-3 hover:shadow-md transition-shadow"
        >
          <div className="w-full h-40 flex items-center justify-center border rounded-md overflow-hidden">
            <img
              src={product?.productMedias[0]?.url}
              alt={product?.title}
              className="object-contain h-full"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {product?.title}
            </h3>
            <p className="text-gray-600">{product?.description}</p>
            
          </div>
        </div>
      ))}
    </div>

    </div>
 
  

  );
};

export default AllProducts;
