import { useEffect, useState } from "react";
import { searchUser } from "util/api/Github";
import dummy from "assets/json/dummy.json";
import Title from "assets/components/Title";
import Link from "next/link";

export default function Home() {
  const [username, setUsername] = useState(null);
  const [userData, setUserData] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (username) {
      // console.log(dummy);
      // setUserData(dummy);
      const searchUsername = async () => {
        try {
          const data = await searchUser(username, 1, 5);
          setUserData(data);

          console.log(data);
        } catch (error) {
          console.log(error);
        }
      };
      searchUsername();
    } else {
      setUserData(null);
    }
  }, [username]);

  return (
    <div className='gthb-display-full'>
      <Title pageTitle='Search github username' />
      <main className='gthb-home'>
        <form onSubmit={(e) => handleSubmit(e)} className='gthb-home-form'>
          <h1 className='gthb-home-form__title'>Github Search</h1>
          <h5 className='gthb-home-form__subtitle subtitle'>
            Finding github user more easy!
          </h5>
          .
          <div className='gthb-home-form__search'>
            <input
              type='text'
              placeholder='Find Username here'
              onChange={(e) => setUsername(e.target.value)}
              className='gthb-home-form__input'
            />
            {/* <button type='submit' className='gthb-home-form__button'>
              Find
            </button> */}
            {userData && (
              <div className='gthb-home-form__search-suggestion'>
                {userData.items.map((item) => (
                  <Link href={`/user/${item.login}`} key={item.id}>
                    <a className='gthb-home-form__search-suggestion-link'>
                      {item.login}
                    </a>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </form>
      </main>
    </div>
  );
}
