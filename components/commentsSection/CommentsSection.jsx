"use client"
import React, { useState } from "react";
import "./style.scss";
import ContentWrapper from "@/components/contentWrapper/ContentWrapper";
import Img from "@/components/lazyLoadImage/Img";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const CommentsSection = ({ data, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <div className="videosSection">
            <ContentWrapper>
                <div className="sectionHeading">Comments</div>
                {!loading ? (
                    <div className="">
                        <div className="grid grid-cols-6 gap-3">
                            <Input className="col-span-5 rounded-full p-2 px-3 bg-white" placeholder="Enter Comment" />
                            <Button className="rounded-full bg-blue-700 hover:bg-blue-800 text-white" variant={"secondary"}>Comment</Button>
                        </div>
                        <br />
                        <hr className="w-4/5 mx-auto border-gray-600 my-4" />
                        <div>
                            <div className="bg-transparent text-gray-200 p-4 antialiased flex">
                                <img className="rounded-full h-8 w-8 mr-2 mt-1 " src="https://picsum.photos/id/1027/200/200" />
                                <div>
                                    <div className="bg-gray-700 rounded-3xl px-4 pt-2 pb-2.5">
                                        <div className="font-semibold text-sm leading-relaxed">Jon Doe</div>
                                        <div className="text-normal leading-snug md:leading-normal"
                                        >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
                                    </div>
                                    <div className="text-sm ml-4 mt-0.5 text-gray-500 dark:text-gray-400">14 w</div>
                                </div>
                            </div>
                            <div className="bg-transparent text-gray-200 p-4 antialiased flex">
                                <img className="rounded-full h-8 w-8 mr-2 mt-1 " src="https://picsum.photos/id/1026/200/200" />
                                <div>
                                    <div className="bg-gray-700 rounded-3xl px-4 pt-2 pb-2.5">
                                        <div className="font-semibold text-sm leading-relaxed">Doe Jon</div>
                                        <div className="text-normal leading-snug md:leading-normal">
                                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                                    </div>
                                    <div className="text-sm ml-4 mt-0.5 text-gray-500 dark:text-gray-400">14 w</div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex justify-center">
                            <hr className="w-1/4 border-gray-600 my-4 mx-4" />
                            <Button className="p-1 px-3 rounded-full text-white bg-blue-800 hover:bg-blue-900">Show More</Button>
                            <hr className="w-1/4 border-gray-600 my-4 mx-4" />
                        </div>
                    </div>
                ) : (
                    <div className="videoSkeleton">
                        {loadingSkeleton()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default CommentsSection;
