"use client";
import React, { useEffect, useState } from "react";
import { NewProduct } from "./Interface";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/api/config";

const Category = () => {
  const [allProductCategory, setAllProductCategory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const init = async () => {
    try {
      setLoading(true);

      // Fetch all medicine data
      const { data } = await apiCall(Methods.GET, EndPoint.MEDICINE_GETALL);

      // Group data by parent category
      const groupedCategories = data.reduce((acc: any, item: NewProduct) => {
        const categoryName = item.category_name || "Unknown Category";
        const parentCategory = acc[categoryName] || {
          label: item.parent_category_name,
          children: [],
        };

        // Add category name to the children if it doesn't already exist
        if (
          !parentCategory.children.find(
            (child: any) => child.label === item.category_name
          )
        ) {
          parentCategory.children.push({ label: item.category_name });
        }

        acc[categoryName] = parentCategory;
        return acc;
      }, {});

      const categories = Object.values(groupedCategories).map(
        (category: any) => ({
          ...category,
          children: (
            <ul className="flex flex-col p-2 mt-2 space-y-3">
              {category.children.map((child: any, idx: number) => (
                <li key={idx}>{child.label}</li>
              ))}
            </ul>
          ),
        })
      );

      // Update state with the transformed categories
      setAllProductCategory(categories);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  if (loading) {
    return <p>Loading categories...</p>;
  }

  return (
    <div>
      {allProductCategory.map((category: any) => (
        <div key={category.key} className="category-item">
          <h3 className="font-bold">{category.label}</h3>
          {category.children}
        </div>
      ))}
    </div>
  );
};

export default Category;
