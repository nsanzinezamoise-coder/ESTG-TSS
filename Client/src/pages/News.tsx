import React, { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AnimatedSection from '../components/ui/AnimatedSection';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const News = () => {
  const navigate = useNavigate();
  const [visibleNewsCount, setVisibleNewsCount] = useState(6); 
  const [data, setData] = useState([]);

  const handleLoadMore = () => {
    setVisibleNewsCount((prev) => prev + 3);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/all_events");
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching stories:', error);
      }
    };

    window.scrollTo(0, 0);
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="py-16 text-center">
        <AnimatedSection>
          <h2 className="text-4xl font-bold mb-4 text-black dark:text-white">Events</h2>
          <p className="text-black dark:text-white max-w-xl mx-auto mb-12">
            Sunt autem nusquam hoc epicurus in gravissimo bello animadversionis metu degendae praesidia firmissima.
          </p>
        </AnimatedSection>

        {data && data.length > 0 ? (
          <>
            <div className="grid gap-8 grid-cols-1 md:grid-cols-3 cursor-pointer max-w-[89%] mx-auto px-6">
              {data.slice(0, visibleNewsCount).map((news) => (
                <div
                  key={news._id}
                  className="rounded-sm border overflow-hidden shadow-md hover:shadow-xl transition duration-300"
                  onClick={() => navigate(`/news/${news._id}`)}
                >
                  <div className="relative h-[300px]">
                    <img
                      src={news.imageUrl}
                      alt={news.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 text-left">
                    <p className="text-sm text-black dark:text-white mb-2">
                      {new Date(news.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <h3 className="text-lg font-semibold text-black dark:text-white uppercase">
                      {news.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            {visibleNewsCount < data.length && (
              <div className="mt-12">
                <button
                  onClick={handleLoadMore}
                  className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-8 py-3 rounded-full transition"
                >
                  See More →
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center max-w-xl mx-auto">
            <svg
              className="w-20 h-20 mb-4 text-gray-400 dark:text-gray-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-white mb-2">
              No Events Found
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              There are currently no events to display. Please check back later for updates.
            </p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default News;
