"use client"
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";

import "./style.scss";

import useFetch from "hooks/useFetch";
import { fetchDataFromApi } from "utils/api";
import ContentWrapper from "@/components/contentWrapper/ContentWrapper";
import MovieCard from "@/components/movieCard/MovieCard";
import Spinner from "@/components/spinner/Spinner";

const sortbyData = [
    { value: "popularity.desc", label: "Popularity Descending" },
    { value: "popularity.asc", label: "Popularity Ascending" },
    { value: "vote_average.desc", label: "Rating Descending" },
    { value: "vote_average.asc", label: "Rating Ascending" },
    {
        value: "primary_release_date.desc",
        label: "Release Date Descending",
    },
    { value: "primary_release_date.asc", label: "Release Date Ascending" },
    { value: "original_title.asc", label: "Title (A-Z)" },
];

let filters: any = {};
const ExploreGenre = ({ params }: { params: { type: string, genre: string } }) => {

    const [data, setData] = useState<any>(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const [genre, setGenre] = useState<any>(null);
    const [sortby, setSortby] = useState(null);
    // const { mediaType } = useParams();

    // const { data: genresData } = useFetch(`/genre/${params.type}/list`);
    const { data: genresData }: { data: any } = useFetch(`/genre/${params.type}/list`);

    const fetchInitialData = () => {
        setLoading(true);
        fetchDataFromApi(`/discover/${params.type}`, filters).then((res) => {
            setData(res);
            setPageNum((prev) => prev + 1);
            setLoading(false);
        });
    };

    const fetchNextPageData = () => {
        fetchDataFromApi(
            `/discover/${params.type}?page=${pageNum}`,
            filters
        ).then((res) => {
            if (data?.results) {
                setData({
                    ...data,
                    results: [...data?.results, ...res.results],
                });
            } else {
                setData(res);
            }
            setPageNum((prev) => prev + 1);
        });
    };

    useEffect(() => {
        filters = {with_genres: params.genre};
        setData(null);
        setPageNum(1);
        setSortby(null);
        setGenre(params.genre);
        fetchInitialData();
    }, [params.type, params.genre]);

    const onChange = (selectedItems: any, action: any) => {
        if (action.name === "sortby") {
            setSortby(selectedItems);
            if (action.action !== "clear") {
                filters.sort_by = selectedItems.value;
            } else {
                delete filters.sort_by;
            }
        }

        setPageNum(1);
        fetchInitialData();
    };

    // console.log(genresData && genresData?.genres.filter((genre:any) => genre.id == params?.genre)[0].name)

    return (
        <div className="explorePage">
            <ContentWrapper>
                <div className="pageHeader">
                    <div className="pageTitle">
                        {params.type === "tv"
                            ? `Explore ${genresData && genresData?.genres.filter((genre:any) => genre.id == params?.genre)[0].name} TV Shows`
                            : `Explore ${genresData && genresData?.genres.filter((genre:any) => genre.id == params?.genre)[0].name} Movies`}
                    </div>
                    <div className="filters">
                        <Select
                            name="sortby"
                            value={sortby}
                            options={sortbyData}
                            onChange={onChange}
                            isClearable={true}
                            placeholder="Sort by"
                            className="react-select-container sortbyDD"
                            classNamePrefix="react-select"
                        />
                    </div>
                </div>
                {loading && <Spinner initial={true} />}
                {!loading && (
                    <>
                        {data?.results?.length > 0 ? (
                            <InfiniteScroll
                                className="content"
                                dataLength={data?.results?.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.total_pages}
                                loader={<Spinner initial={true} />}
                            >
                                {data?.results?.map((item: any, index: any) => {
                                    if (item.media_type === "person") return;
                                    return (
                                        <MovieCard
                                            key={index}
                                            data={item}
                                            fromSearch={false}
                                            mediaType={params.type}
                                        />
                                    );
                                })}
                            </InfiniteScroll>
                        ) : (
                            <span className="resultNotFound">
                                Sorry, Results not found!
                            </span>
                        )}
                    </>
                )}
            </ContentWrapper>
        </div>
    );
};

export default ExploreGenre;
