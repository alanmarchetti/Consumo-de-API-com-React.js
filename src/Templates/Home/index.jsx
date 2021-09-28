import { useEffect, useState, useCallback } from 'react';

import './style.css';

import { Posts } from '../../components/Posts/index';
import { loadPost } from '../../utils/load-posts';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input'


const Home = () => {

  const [posts, setPosts] = useState([]);
  const [allPosts, setallPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(6);
  const [searchValue, setSearchValue] = useState('');

  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteredPosts = !!searchValue ?
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase());
    }) : posts;


  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPost();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setallPosts(postsAndPhotos);
  }, []);

  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);


  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);

  }

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchValue(value)
  }

  return (
    <section className="container">
      <div className="search-container">
        {!!searchValue && (
          <h1> Search value: {searchValue}</h1>
        )}

        <Input
          handleChange={handleChange}
          searchValue={searchValue}
        />
      </div>


      {filteredPosts.length > 0 && (
        <Posts posts={filteredPosts} />
      )}

      {filteredPosts.length === 0 && (
        <p>Nada encontrado</p>
      )}

      <div className="button-container">
        {!searchValue && (
          <Button
            disabled={noMorePosts}
            onClick={loadMorePosts}
            text='Mais posts'
          />
        )};
      </div>
    </section>
  );
}

export default Home
