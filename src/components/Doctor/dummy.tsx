"use client";

import React from "react";

interface Category {
    _id: string;
    name: string;
}

interface WorkDetail {
    organization: string;
    designation: string;
    startMonth: string;
    startYear: number;
    endMonth: string;
    endYear: number;
    isCurrentlyWorking: boolean;
}

interface DoctorProfile {
    _id: string;
    firstName: string;
    lastName: string;
    category: Category[];
    hospital: string;
    degree: string;
    bmdc: string;
    visitFee: number;
    yearsOfExperience: number;
    workDetails: WorkDetail[];
    email: string;
    phone: string;
    role: string;
    isActive: boolean;
    image: string;
    personalDetails?: string;
    bmdcRegistered: boolean;
    isAvailable?: boolean;
}

interface Props {
    doctor: DoctorProfile;
}

export default function DoctorProfileView({ doctor }: Props) {
    return (
        <div className="min-h-screen bg-gray-50 px-3 py-5 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">

                {/* =====================================================
                    PROFILE HEADER
                ====================================================== */}
                <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-100">

                    {/* Top background */}
                    <div className="h-28 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 sm:h-36" />

                    <div className="px-4 pb-6 sm:px-8">

                        <div className="relative -mt-14 flex flex-col items-center gap-5 sm:-mt-16 sm:flex-row sm:items-end">

                            {/* Doctor Image */}
                            <div className="relative shrink-0">
                                <img
                                    src={doctor.image}
                                    alt={`${doctor.firstName} ${doctor.lastName}`}
                                    className="
                                        h-28 w-28 rounded-2xl
                                        border-4 border-white
                                        bg-white object-cover
                                        shadow-lg
                                        sm:h-32 sm:w-32
                                    "
                                />

                                {/* Online / available indicator */}
                                <span
                                    className={`
                                        absolute bottom-2 right-2
                                        h-4 w-4 rounded-full
                                        border-2 border-white
                                        ${doctor.isAvailable
                                            ? "bg-green-500"
                                            : "bg-gray-400"
                                        }
                                    `}
                                />
                            </div>

                            {/* Doctor name */}
                            <div className="min-w-0 flex-1 text-center sm:pb-1 sm:text-left">
                                <div className="flex flex-col items-center gap-2 sm:flex-row">
                                    <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                                        {doctor.firstName} {doctor.lastName}
                                    </h1>

                                    {doctor.bmdcRegistered && (
                                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                                            ✓ BMDC Verified
                                        </span>
                                    )}
                                </div>

                                <p className="mt-1 text-sm font-medium text-gray-500">
                                    {doctor.role
                                        ?.replaceAll("_", " ")
                                        .replace(/\b\w/g, (c) =>
                                            c.toUpperCase()
                                        )}
                                </p>
                            </div>

                            {/* Status */}
                            <div className="sm:pb-1">
                                <span
                                    className={`
                                        inline-flex items-center gap-2
                                        rounded-full px-4 py-2
                                        text-sm font-medium
                                        ${doctor.isActive
                                            ? "bg-green-50 text-green-700"
                                            : "bg-red-50 text-red-700"
                                        }
                                    `}
                                >
                                    <span
                                        className={`
                                            h-2 w-2 rounded-full
                                            ${doctor.isActive
                                                ? "bg-green-500"
                                                : "bg-red-500"
                                            }
                                        `}
                                    />

                                    {doctor.isActive
                                        ? "Active"
                                        : "Inactive"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* =====================================================
                    MAIN CONTENT
                ====================================================== */}
                <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">

                    {/* =================================================
                        LEFT / MAIN CONTENT
                    ================================================== */}
                    <div className="space-y-6 lg:col-span-2">

                        {/* About Doctor */}
                        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 sm:p-6">

                            <div className="mb-5 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                                    <svg
                                        className="h-5 w-5 text-blue-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </div>

                                <div>
                                    <h2 className="font-bold text-gray-900">
                                        About Doctor
                                    </h2>

                                    <p className="text-xs text-gray-400">
                                        Professional information
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3 text-sm leading-7 text-gray-600">
                                {doctor.personalDetails ? (
                                    doctor.personalDetails
                                        .split("\r\n")
                                        .map(
                                            (paragraph, index) =>
                                                paragraph.trim() && (
                                                    <p key={index}>
                                                        {paragraph}
                                                    </p>
                                                )
                                        )
                                ) : (
                                    <p>
                                        No professional information has been
                                        added yet.
                                    </p>
                                )}
                            </div>
                        </section>

                        {/* Education / Qualification */}
                        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 sm:p-6">

                            <div className="mb-5 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50">
                                    🎓
                                </div>

                                <div>
                                    <h2 className="font-bold text-gray-900">
                                        Education & Qualification
                                    </h2>

                                    <p className="text-xs text-gray-400">
                                        Medical qualifications
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-xl bg-gray-50 p-4">
                                <p className="text-sm font-medium leading-7 text-gray-700">
                                    {doctor.degree}
                                </p>
                            </div>
                        </section>

                        {/* Work Experience */}
                        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 sm:p-6">

                            <div className="mb-6 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50">
                                    💼
                                </div>

                                <div>
                                    <h2 className="font-bold text-gray-900">
                                        Professional Experience
                                    </h2>

                                    <p className="text-xs text-gray-400">
                                        Career history
                                    </p>
                                </div>
                            </div>

                            <div className="relative space-y-6 pl-6">

                                {/* Timeline line */}
                                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gray-200" />

                                {doctor.workDetails?.map(
                                    (work, index) => (
                                        <div
                                            key={index}
                                            className="relative"
                                        >
                                            {/* Timeline dot */}
                                            <span
                                                className="
                                                    absolute -left-[25px]
                                                    top-1.5 h-3 w-3
                                                    rounded-full
                                                    border-2 border-white
                                                    bg-blue-500
                                                    ring-2 ring-blue-100
                                                "
                                            />

                                            <div>
                                                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900">
                                                            {work.designation}
                                                        </h3>

                                                        <p className="mt-1 text-sm font-medium text-gray-600">
                                                            {work.organization}
                                                        </p>
                                                    </div>

                                                    <span className="w-fit rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-500">
                                                        {work.startMonth}{" "}
                                                        {work.startYear}
                                                        {" - "}
                                                        {work.isCurrentlyWorking
                                                            ? "Present"
                                                            : `${work.endMonth} ${work.endYear}`}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </section>
                    </div>

                    {/* =================================================
                        RIGHT SIDEBAR
                    ================================================== */}
                    <div className="space-y-6">

                        {/* Consultation Card */}
                        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">

                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="font-bold text-gray-900">
                                    Consultation
                                </h2>

                                <span className="rounded-lg bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                                    Available
                                </span>
                            </div>

                            <div className="rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 p-5">
                                <p className="text-sm text-gray-500">
                                    Consultation Fee
                                </p>

                                <div className="mt-1 flex items-end gap-1">
                                    <span className="text-3xl font-bold text-gray-900">
                                        ৳{doctor.visitFee}
                                    </span>

                                    <span className="mb-1 text-sm text-gray-500">
                                        / visit
                                    </span>
                                </div>
                            </div>

                            {/* Future time slot area */}
                            <div className="mt-4 rounded-xl border border-dashed border-gray-200 p-4 text-center">
                                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-gray-50">
                                    🕐
                                </div>

                                <p className="mt-2 text-sm font-medium text-gray-700">
                                    Appointment schedule
                                </p>

                                <p className="mt-1 text-xs text-gray-400">
                                    Time slots will appear here
                                </p>
                            </div>
                        </section>

                        {/* Specialization */}
                        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">

                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                                    🩺
                                </div>

                                <h2 className="font-bold text-gray-900">
                                    Specialization
                                </h2>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {doctor.category?.length > 0 ? (
                                    doctor.category.map((category) => (
                                        <span
                                            key={category._id}
                                            className="
                                                rounded-full
                                                bg-gray-50
                                                px-3 py-1.5
                                                text-xs font-medium
                                                text-gray-600
                                            "
                                        >
                                            {category.name}
                                        </span>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-400">
                                        No specialization added.
                                    </p>
                                )}
                            </div>
                        </section>

                        {/* Doctor Details */}
                        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">

                            <h2 className="mb-4 font-bold text-gray-900">
                                Doctor Details
                            </h2>

                            <div className="space-y-4">

                                {/* Experience */}
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                                        ⏱️
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-400">
                                            Experience
                                        </p>

                                        <p className="text-sm font-semibold text-gray-800">
                                            {doctor.yearsOfExperience} Years
                                        </p>
                                    </div>
                                </div>

                                {/* BMDC */}
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50">
                                        ✓
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-400">
                                            BMDC Registration
                                        </p>

                                        <p className="text-sm font-semibold text-gray-800">
                                            {doctor.bmdc}
                                        </p>
                                    </div>
                                </div>

                                {/* Hospital */}
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50">
                                        🏥
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-400">
                                            Hospital
                                        </p>

                                        <p className="text-sm font-semibold text-gray-800">
                                            {doctor.hospital}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Contact */}
                        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">

                            <h2 className="mb-4 font-bold text-gray-900">
                                Contact Information
                            </h2>

                            <div className="space-y-3">

                                <a
                                    href={`mailto:${doctor.email}`}
                                    className="
                                        flex items-center gap-3
                                        rounded-xl bg-gray-50 p-3
                                        transition hover:bg-blue-50
                                    "
                                >
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white">
                                        ✉️
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-400">
                                            Email
                                        </p>

                                        <p className="truncate text-sm font-medium text-gray-700">
                                            {doctor.email}
                                        </p>
                                    </div>
                                </a>

                                <a
                                    href={`tel:${doctor.phone}`}
                                    className="
                                        flex items-center gap-3
                                        rounded-xl bg-gray-50 p-3
                                        transition hover:bg-green-50
                                    "
                                >
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white">
                                        📞
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-400">
                                            Phone
                                        </p>

                                        <p className="text-sm font-medium text-gray-700">
                                            {doctor.phone}
                                        </p>
                                    </div>
                                </a>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

