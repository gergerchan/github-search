import Title from "assets/components/Title";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { detailUser, getRepo } from "util/api/Github";
import dayjs from "dayjs";
import Link from "next/link";
import Modal from "assets/components/Modal";

const Username = () => {
  const router = useRouter();
  const [modalShow, setModalShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingRepo, setIsLoadingRepo] = useState(true);
  const [username, setUsername] = useState(null);
  const [userData, setUserData] = useState(null);
  const [repository, setRepository] = useState(null);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [totalRepo, setTotalRepo] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(5);
  const [maxPage, setMaxPage] = useState(1);

  const toggleModal = (item) => {
    setSelectedRepo(item);
    setModalShow(!modalShow);
  };

  const getDetailUser = async (user) => {
    try {
      const data = await detailUser(user);
      setTotalRepo(data.public_repos);
      setMaxPage(Math.ceil(data.public_repos / totalPage));
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getRepoUser = async (user) => {
    try {
      const data = await getRepo(user, page, totalPage);
      setRepository(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePaging = async (status) => {
    setIsLoadingRepo(true);
    if (status) {
      page != totalPage && setPage((prev) => prev + 1);
    } else {
      page != totalPage && setPage((prev) => prev - 1);
    }
    try {
      const data = await getRepo(username, page, totalPage);
      setRepository(data);
      setIsLoadingRepo(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleMinMaxPaging = async (status) => {
    setIsLoadingRepo(true);

    if (status) {
      setPage(maxPage);
    } else {
      setPage(1);
    }
    try {
      const data = await getRepo(username, status ? maxPage : 1, totalPage);
      setRepository(data);
      setIsLoadingRepo(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeTotalPage = async (e) => {
    setIsLoadingRepo(true);
    setTotalPage(e.target.value);
    let max = Math.ceil(totalRepo / e.target.value);
    page > max && setPage(max);
    setMaxPage(max);
    try {
      const data = await getRepo(
        username,
        page > max ? max : page,
        e.target.value
      );
      setRepository(data);
      setIsLoadingRepo(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setIsLoadingRepo(true);
    if (!router.isReady) return;
    setUsername(router.query.username);
    getDetailUser(router.query.username);
    getRepoUser(router.query.username);
    setIsLoading(false);
    setIsLoadingRepo(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <div>
      <Title pageTitle='Detail User' />
      <div className='gthb-user-head'>
        <Link href='/'>
          <a className='gthb-user-head__link'>{"<"} Back to search page</a>
        </Link>
      </div>
      <main className='gthb-user'>
        <section className='gthb-user-profile'>
          {!isLoading && userData && (
            <>
              <img
                src={userData.avatar_url}
                alt='profile'
                className='gthb-user-profile__picture'
              />
              <h1>{userData.name}</h1>
              <h2>Username : {userData.login}</h2>
              <p>
                Created At : {dayjs(userData.created_at).format("DD-MM-YYYY")}
              </p>
              <p>
                Last Update : {dayjs(userData.updated_at).format("DD-MM-YYYY")}
              </p>
            </>
          )}
        </section>
        <section className='gthb-user-repo'>
          {!isLoadingRepo && repository && (
            <>
              {repository.map((item) => (
                <div
                  // href={`https://github.com/${username}/${item.name}`}
                  // target='_blank'
                  // rel='noopener noreferrer'
                  onClick={() => toggleModal(item)}
                  key={item.id}
                  className='gthb-user-repo__card'
                >
                  <span className='gthb-user-repo__card-id'>{item.id}</span>
                  <span className='gthb-user-repo__card-badge'>
                    {item.language || "Unknown"}
                  </span>
                  <p className='gthb-user-repo__card-date'>
                    Created At : {dayjs(item.created_at).format("DD-MM-YYYY")}
                  </p>
                  <h3 className='gthb-user-repo__card-name'>{item.name}</h3>
                  <p className='gthb-user-repo__card-date'>
                    Last Update : {dayjs(item.updated_at).format("DD-MM-YYYY")}
                  </p>
                </div>
              ))}
            </>
          )}
          <div className='gthb-user-repo__paging'>
            <div className='gthb-user-repo__paging-control'>
              <button
                type='button'
                onClick={() => handleMinMaxPaging(false)}
                disabled={isLoading}
                className='gthb-user-repo__paging-control-button'
              >{`|<`}</button>
              <button
                type='button'
                onClick={() => handlePaging(false)}
                disabled={isLoading}
                className='gthb-user-repo__paging-control-button'
              >{`<`}</button>
              <span>
                Page {page} of {maxPage}
              </span>
              <button
                type='button'
                onClick={() => handlePaging(true)}
                disabled={isLoading}
                className='gthb-user-repo__paging-control-button'
              >{`>`}</button>
              <button
                type='button'
                onClick={() => handleMinMaxPaging(true)}
                disabled={isLoading}
                className='gthb-user-repo__paging-control-button'
              >{`>|`}</button>
            </div>
            <div className='gthb-user-repo__paging-total'>
              <label htmlFor='pagination'>
                Show data per page :{" "}
                <select
                  name='pagination'
                  id='pagination'
                  onChange={(e) => handleChangeTotalPage(e)}
                  value={totalPage}
                >
                  <option value='5'>5</option>
                  <option value='10'>10</option>
                  <option value='20'>20</option>
                </select>
              </label>
            </div>
          </div>
        </section>
      </main>
      <Modal open={modalShow} close={toggleModal} data={selectedRepo} />
    </div>
  );
};

export default Username;
