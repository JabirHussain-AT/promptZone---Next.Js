"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Provaider from "./Provaider";

const Nav = () => {
   const { data , session }  = useSession()

  const [provaiders, setProvaiders] = useState(null);
  const [ toggleDropDown , setToggleDropDown ] = useState( false )

  useEffect(() => {
    const setProvaiderFunction = async () => {
      const response = await getProviders();

      setProvaiders(response);
    };
    setProvaiderFunction()
  }, []);
  return (
    <nav className="flex-between w-full mb-16 pt-13">
      <Link href={"/"} className="flex gap-2 flex-center">
        <Image
          src={"/assets/images/logo.svg"}
          alt="promptZone Logo"
          width={30}
          height={30}
          className="object-contain py-5"
        />
        <p className="logo_text">PromptZone</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">

        { session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create New Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={"/assets/images/logo.svg"}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {provaiders &&
              Object.values(provaiders).map((Provaider) => (
                <button
                  type="button"
                  key={Provaider.name}
                  onClick={() => signIn(Provaider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      {/* Mobile Navigation */}

      <div className="sm:hidden flex relative">
        {
          session?.user ? (
            <div className="flex"> 
                 <Image
                src={"/assets/images/logo.svg"}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
                onClick={ () => setToggleDropDown( (prev) => !prev ) }
              />
              {
                toggleDropDown && (
                  <div className="dropdown">
              
                      <Link
                      href={'/profile'}
                      className="dropdown_link"
                      onClick={ () => setToggleDropDown(false) }
                      >
                       My Profile
                      </Link>
                      <Link
                      href={'/create-prompt'}
                      className="dropdown_link"
                      onClick={ () => setToggleDropDown(false) }
                      >
                        Create Prompt 
                      </Link>
                      <button
                      type="button"
                      onClick={ () => {
                        setToggleDropDown(false)
                        signOut()
                      } }
                      className="mt-5 w-full black_btn"
                      >
                        Sign Out 
                      </button>
                  </div>
                )
              }
            </div>
          ) : (
            <>
            {provaiders &&
              Object.values(provaiders).map((Provaider) => (
                <button
                  type="button"
                  key={Provaider.name}
                  onClick={() => signIn(Provaider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
          )
        }
      </div>
    </nav>
  );
};

export default Nav;
