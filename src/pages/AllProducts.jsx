import { useEffect, useState } from "react";


const AllProducts = () => {
    const [products, setProducts] = useState([])

        useEffect(() =>{
    
            const fetchData = async () => {
                try {
                  const response = await fetch(`http://localhost:8080/api/public/product/all-products`)
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
    
    
    
        }, [])

  return (
    <div className=" w-full p-7  bg-white">



        <div className="overflow-x-auto w-full">
        <table className="table  w-full">
            {/* head */}
            <thead>
            <tr>
                <th></th>
                <th>Name</th>
                <th>Categories</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>

            {products.map((product, index) => (
                <tr key={product.productId}>
                <th>1</th>
                <td>
                    <div className=" flex gap-x-3">
                        <div className=" border w-[50px] h-[50px] rounded-md">
                            <img src={product.productMedias[0].url} className=" w-full h-full object-contain aspect-square"  alt="" />
                        </div>

                    </div>
                </td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
                </tr>
            ))}

            </tbody>
        </table>
        </div>

    </div>
  )
}

export default AllProducts