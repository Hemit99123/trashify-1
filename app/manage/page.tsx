"use client";

import React, { useEffect, useState } from 'react';
import ActionButton from '@/components/ActionButton';
import Plus from '@/assets/regular/plus.svg';
import Search from '@/assets/regular/search-2.svg';
import { useRouter } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';
import axios from 'axios';
import { ItemsProp } from '@/types/poststate';
import DeleteItem from '@/components/DeleteItem';

const Page = () => {
  const [post, setPost] = useState<ItemsProp[]>([]);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const handleGetPost = async () => {
      try {
        const result = await axios.get(`/api/post/user?email=${user?.email}`);
        setPost(result.data.data);
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    };

    if (user?.email) {
      handleGetPost();
    }
  }, [user?.email]);


  const handleNavigateToPost = () => {
    router.push('/post');
  };

  const handleSearch = async () => {
    const query = prompt('What is your search term?')

    await axios.get(`/api/post/search?query=${query}`)
      .then((result) => {
        setPost(result.data.data)
      })
  };

  return (
    <div>
      <h1 className='text-4xl font-medium pl-8 pt-10'>My Bins</h1>

      <div className='flex top-28 right-10 absolute space-x-2'>
        <ActionButton SVG={Search} action={handleSearch} />
        <ActionButton SVG={Plus} action={handleNavigateToPost} />
      </div>

      <div className='mt-7 p-4 pl-8'>
        <table className='max-w-screen-2xl w-full text-xs'>
          <thead>
            <tr>
              <th className='pb-4 px-2 text-left'>Name</th>
              <th className='pb-4 px-2 text-left'>Location</th>
              <th className='pb-4 px-2 text-left'>Type</th>
            </tr>
          </thead>
          <tbody>
            {post.map((item: ItemsProp, index) => (
              <DeleteItem item={item} index={index} />
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Page;
