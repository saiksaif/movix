"use client"
import React from "react";
// import { useParams } from "react-router-dom";
import "./style.scss";

// import useFetch from "../../hooks/useFetch";
import useFetch from "hooks/useFetch";
import DetailsBanner from "@/components/detailsBanner/DetailsBanner";
import Cast from "@/components/cast/Cast";
import VideosSection from "@/components/videosSection/VideosSection";
import CommentsSection from "@/components/commentsSection/CommentsSection"
import Similar from "@/components/carousels/Similar";
import Recommendation from "@/components/carousels/Recommendation";

const Details = ({ params }: { params: { mediaType: any, id: any } }) => {
    // const { mediaType, id } = useParams();
    const { data, loading }: { data: any, loading: any } = useFetch(`/${params.mediaType}/${params.id}/videos`);
    const { data: credits, loading: creditsLoading }: { data: any, loading: any } = useFetch(
        `/${params.mediaType}/${params.id}/credits`
    );

    return (
        <div>
            <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} mediaType={params.mediaType} id={params.id} />
            <Cast data={credits?.cast} loading={creditsLoading} />
            <VideosSection data={data} loading={loading} />
            <CommentsSection data={data} loading={loading} />
            <Similar mediaType={params.mediaType} id={params.id} />
            <Recommendation mediaType={params.mediaType} id={params.id} />
        </div>
    );
};

export default Details;