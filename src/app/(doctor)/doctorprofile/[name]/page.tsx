import DoctorList from '@/components/Doctor/DoctorList'
import React, { Suspense } from 'react'
import Loading from '../loading'
import DoctorSeoProfile from '@/components/Doctor/DoctorSeoProfile'
import { Metadata } from 'next';
import { EndPoint, Methods } from '@/api/config';
import { apiCall } from '@/lib/axios-client';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ name: string }>;
}): Promise<Metadata> {
    try {
        const { name } = await params;
        const decodedName = decodeURIComponent(name);

        const [firstName, lastName] = decodedName.split("_");

        const value = {
            name: firstName,
        };

        const res = await apiCall(
            Methods.POST,
            EndPoint.SEARCH_DOCTOR,
            value
        );

        const data: any = res.data[0];

        return {
            title: data?.firstName
                ? `${data?.firstName} ${data?.lastName ?? ""}`
                : "Doctor",
            description: data?.personalDetails,
        };
    } catch (error) {


        return {
            title: "Doctor Not Found",
            description: "The requested Doctor could not be loaded.",
        };
    }
}
export default async function page({
    params,
}: {
    params: Promise<{ name: string }>;
}) {
    const slugString = (await params).name;

    return (
        <Suspense fallback={<Loading />}>
            <DoctorSeoProfile slugString={slugString} />
        </Suspense>
    );
}