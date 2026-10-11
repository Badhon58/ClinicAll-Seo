"use client";

import dynamic from "next/dynamic";
const Seopage = dynamic(() => import("./Seopage"), {
    ssr: false,
});

export default function SeoClientPage() {
    return <Seopage />;
}
import React from 'react'

