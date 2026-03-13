import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const AddItem = () => {
  const { adminToken, backendUrl, product } = useContext(AppContext);

  const [productName, setProductName] = useState("");
  const [attributes, setAttributes] = useState([]);
  const [visualAtt,setVisualAtt]=useState([])
  const [sellableAtt,setSellableAtt]=useState([])
  const [variants,setVariants]=useState([
    {
      visualPart:{},
      sellablePart:[{
        sellable:{},
        price:"",
        stock:"",
        status:""
      }],
      images:[""]
    }
  ])
  
  const getAttributesValue=async(productName)=>{
    try {
      const {data}=await axios.post(`${backendUrl}/api/admin/get-attribute-value`,{productId:productName},{
        headers:{
          "token":adminToken
        }
      })
      if(data.success){
        setAttributes(data.attributes)
      }
    } catch (error) {
      console.log(error)
    }
  }
 useEffect(()=>{
  if(productName){
    getAttributesValue(productName)
  }
},[productName])
useEffect(()=>{
  setVisualAtt(attributes.filter(att => att.inputType === "VISUAL"))
  setSellableAtt(attributes.filter(att => att.inputType === "SELLABLE"))
},[attributes])

//variant created logic
const create_variant=async()=>{
  try {
    const payload=variants.flatMap(v=>{
      const attributesArr=[]
      // storing visual att
      for(const key in v.visualPart){
        attributesArr.push({
          attribute:key,
          value:v.visualPart[key]
        })
      }
      // stroing sellable att
      return v.sellablePart.map(sp=>{
        const attArr=[...attributesArr]
       for(const key in sp.sellable){
        attArr.push({
          attribute:key,
          value:sp.sellable[key]
        })
       }
       return {
        product:productName,
        attributes:attArr,
        images:v.images,
        price:sp.price,
        stock:sp.stock,
        status:sp.status
       }
      })
    })
    
    const formData=new FormData();
    payload.forEach((p,idx)=>{
      formData.append(`variants[${idx}][product]`,p.product);
      p.attributes.forEach((att,i)=>{
        formData.append(`variants[${idx}][attributes][${i}][attribute]`,att.attribute);
        formData.append(`variants[${idx}][attributes][${i}][value]`,att.value);
      })
     p.images.forEach(img=>{
      formData.append(`variants[${idx}][images]`,img);
     })
      formData.append(`variants[${idx}][price]`,p.price);
      formData.append(`variants[${idx}][stock]`,p.stock);
      formData.append(`variants[${idx}][status]`,p.status);
    })
    const {data}=await axios.post(`${backendUrl}/api/admin/create-variant`,formData,{
      headers:{
        token:adminToken,
        "Content-Type":"multipart/form-data"
      }
    })
    if(data.success){
      toast.success(data.message)
      setProductName("")
      setVisualAtt([])
      setSellableAtt([])
    const defaultVariant = {
    visualPart:{},
    sellablePart:[{
      sellable:{},
      price:"",
      stock:"",
      status:""
    }],
    images:[null]
  }
  setVariants([defaultVariant])
    }else{
      toast.error(data.message)
    }
  } catch (error) {
    console.log(error)
  }
}
  /* ---------------- UI ---------------- */

  return (
    <div>
    <div className="border-2 p-2 m-2">
      {/*---select product */}
      <div className="w-1/4 border rounded mb-2">
          
           <select name="" id="" className="w-full p-2 rounded"
            value={productName} onChange={(e)=>setProductName(e.target.value)}>
            <option value="">select product</option>
            {
              product.map(pro=>(
                <option key={pro._id} value={pro._id}>{pro.name}</option>
              ))
            }
           </select>
          
      </div>
    {/*----variants---- */}
    <div className="border-2 p-4 space-y-6">
       {
        variants.map((v,idx)=>(
          <div key={idx} className="border p-4 rounded-lg bg-gray-50 space-y-4">
            {/*----visual variants---- */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {
                    visualAtt?.map(va=>(
                      <div key={va._id}>
                        <select name="" id="" value={v.visualPart[va._id] || ""} 
                        className="w-full border p-2 rounded" 
                        onChange={(e) => {
                        const updatedVariants = [...variants];
                        updatedVariants[idx].visualPart = {
                        ...updatedVariants[idx].visualPart,
                        [va._id]: e.target.value
                        };
                        setVariants(updatedVariants);
                        }}>
                          <option value="">select {va.name}</option>
                          {
                            va["values"]?.map((val)=>(
                              <option key={val._id} value={val._id}>{val.value}</option>
                            ))
                          }
                        </select>
                      </div>
                    ))
                  }
              </div>
              {/*------images------- */}
              <div className="w-full">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {
                  variants[idx].images?.map((img,index)=>(
                    <div key={index} className="border rounded-lg p-2 flex flex-col items-center justify-center">
                    <label className="cursor-pointer block w-full h-full">

                      <input
                        type="file"
                        className="hidden"
                        onChange={(e)=>{
                          const updated=[...variants]

                          const newImages=[...updated[idx].images]

                          newImages[index]=e.target.files[0]

                          updated[idx].images=newImages

                          setVariants(updated)
                        }}
                      />

                      {variants[idx].images[index] ? (
                        <img
                          src={URL.createObjectURL(variants[idx].images[index])}
                          className="w-full h-full object-cover"
                          alt=""
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-xs text-gray-500">
                          Upload
                        </div>
                      )}

                    </label>
                     
                    </div>
                  ))
                }
                </div>
                <button className="mt-3 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm sm:text-base rounded-md w-full sm:w-auto transition"
                 onClick={(e)=>{
                  const updated=[...variants]
                  const newImages=[...updated[idx].images]
                  newImages.push("")
                  updated[idx].images=newImages
                  setVariants(updated)
                }}>ADD IMAGES</button>
                </div>

              {/*-----sellable variants---- */}
              {
                variants[idx]["sellablePart"]?.map((sp,index)=>(
                  <div key={index} className="border p-4 rounded-md bg-white space-y-4">
                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {
                      sellableAtt?.map(s=>(
                          <select key={s._id} className="w-full border p-2 rounded" value={sp.sellable?.[s._id] || ""} 
                        onChange={(e)=>{
                          const updated=[...variants]
                          updated[idx]["sellablePart"][index].sellable= {
                         ...updated[idx].sellablePart[index].sellable,
                        [s._id]: e.target.value
                        }
                          setVariants(updated);
                        }}>
                          <option value="">select {s.name}</option>
                          {
                            s["values"]?.map((val)=>(
                              <option key={val._id} value={val._id}>{val.value}</option>
                            ))
                          }
                        </select>
                      ))
                    }
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                 <input type="number" value={sp.price || ""} name="price" id="price" placeholder="enter price" className="border p-2 rounded w-full" onChange={(e)=>{
                const updated=[...variants]
                updated[idx]["sellablePart"][index]["price"]=e.target.value
                setVariants(updated);
              }} />
               <input type="number" name="stock" value={sp.stock || ""} id="stock" placeholder="enter stock" className="border p-2 rounded w-full" onChange={(e)=>{
                const updated=[...variants]
                updated[idx]["sellablePart"][index]["stock"]=e.target.value
                setVariants(updated);
              }} />
              <select name="" id="" className="border p-2 rounded w-full" value={sp.status || ""} onChange={(e)=>{
                const updated=[...variants]
                updated[idx]["sellablePart"][index]["status"]=e.target.value
                setVariants(updated);
              }}>
                <option value="">select status</option>
                <option value="active">ACTIVE</option>
                <option value="inactive">INACTIVE</option>
              </select>
              </div>
                </div>
                ))
              }
              <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
               onClick={()=>{
                const updated=[...variants]
                updated[idx]["sellablePart"].push({
                  sellable:{},
                  price:"",
                  stock:"",
                  status:""
                })
                setVariants(updated)
              }}>Add SKU</button>
          </div>
        ))
       }
    </div>
    {/*--------add more variants---- */}
    <button className="w-full mt-2 sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
     onClick={(e)=>{
      const updated=[...variants]
      updated.push({
      visualPart:{},
      sellablePart:[{
        sellable:{},
        price:"",
        stock:"",
        status:""
      }],
      images:[""]
    })
      setVariants(updated);
    }}>Add Variant</button>
    </div>
    <button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
    onClick={create_variant}
    >
      CREATE VARIANT
    </button>
    </div>
  );
};
// problem :-line 98 on selecting value , selected value is not appearing. aur thought about jb  multiple sellable aur visual ho to object me store kaise krene array need??h kya
export default AddItem;
