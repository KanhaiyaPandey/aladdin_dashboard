/* eslint-disable no-unused-vars */

const MediaUpload = () => {

    const medias = [
        "http://res.cloudinary.com/dwfe5swye/image/upload/v1736005832/sjh7bnwrrsvnwrhnaz5r.jpg",
        "http://res.cloudinary.com/dwfe5swye/image/upload/v1736005834/bvfapswayddchuhzkfav.jpg",
        "http://res.cloudinary.com/dwfe5swye/image/upload/v1736005835/qtqcfbmk7wqjqn3c6axv.jpg",
        "http://res.cloudinary.com/dwfe5swye/image/upload/v1736005837/ovzcmnwptfz8zr8ugilk.jpg",
        "http://res.cloudinary.com/dwfe5swye/image/upload/v1736005839/gdv7lej5ybnja87pl8bs.jpg",
        "http://res.cloudinary.com/dwfe5swye/image/upload/v1736309955/zobmt29ao6u1ri2td1jk.jpg",
        "http://res.cloudinary.com/dwfe5swye/image/upload/v1736310821/ilsym55qq9lexmqfcj82.jpg",
        "http://res.cloudinary.com/dwfe5swye/image/upload/v1736311886/kcsj5gp2bhpt7i3p4ypm.jpg",
        "http://res.cloudinary.com/dwfe5swye/image/upload/v1736311985/epqsuha9fqrfvb8dsdwa.jpg",
        "http://res.cloudinary.com/dwfe5swye/image/upload/v1736692990/gsskvb6zcavqtmmtshnn.webp",
        "http://res.cloudinary.com/dwfe5swye/image/upload/v1736681473/asd14x7uwzs2cypdntqh.jpg"
    ]

  return (
    <div className="w-full max-h-[60vh] flex flex-col lato gap-y-5 px-5 py-6 rounded-2xl border shadow-md">
      <h1 className=" text-xl ">Product Medias</h1>

      <div className=" w-full flex gap-3  justify-center">
      
        <div className=" w-3/12 rounded-lg bg-white border">
         <img src={medias[0]} className=" rounded-lg w-full h-full aspect-square object-contain shadow-md" alt="" />
        </div>

        <div className="w-9/12 grid grid-cols-5 gap-2">
            {medias.slice(1).map((media, index) => (
                <div 
                key={index} 
                className="rounded-lg bg-white border flex items-center justify-center aspect-square">
                <img 
                    src={media} 
                    className="rounded-lg w-full h-full object-contain shadow-md" 
                    alt="" 
                />
                </div>
            ))}
        </div>


        
      </div>

    </div>
  )
}

export default MediaUpload