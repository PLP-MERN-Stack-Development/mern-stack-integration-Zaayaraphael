import React, { useEffect } from 'react';
import { postService } from '../services/api';
import { useApi } from '../hooks/useApi';
import { usePagination } from '../hooks/usePagination';
import PostList from '../components/PostList';
import Pagination from '../components/Pagination';
import './HomePage.css';

const HomePage = () => {
  const { data, loading, execute } = useApi(postService.getAllPosts);
  const { page, setPage, totalPages, setTotalPages, hasNext, hasPrev } =
    usePagination();

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await execute(page, 10);
      if (result.success && result.data) {
        setTotalPages(result.data.totalPages || 1);
      }
    };

    fetchPosts();
  }, [page, execute, setTotalPages]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="home-page">
      <div className="container">
        <div className="home-header">
          <h1>Latest Blog Posts</h1>
          <p>Discover stories, thinking, and expertise from writers on any topic.</p>
        </div>

        <PostList posts={data?.posts} loading={loading} />

        {data?.posts && data.posts.length > 0 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            hasNext={hasNext}
            hasPrev={hasPrev}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
