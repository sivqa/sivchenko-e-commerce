import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import useOnClickOutside from 'use-onclickoutside';
import Logo from '../../assets/icons/logo';
import Link from 'next/link';
import { RootState } from 'store';

type HeaderType = {
  isErrorPage?: Boolean;
}

const Header = ({ isErrorPage }: HeaderType) => {
  const { cartItems } = useSelector((state: RootState)  => state.cart);

  const [onTop, setOnTop] = useState(( isErrorPage ) ? false : true);
  const [searchOpen, setSearchOpen] = useState(false);
  const navRef = useRef(null);
  const searchRef = useRef(null);

  const headerClass = () => {
    if(window.pageYOffset === 0) {
      setOnTop(false);
    } else {
      setOnTop(true);
    }
  }

  useEffect(() => {
    if(isErrorPage) {
      return;
    }

    headerClass();
    window.onscroll = function() {
      headerClass();
    };
  }, []);

  const closeSearch = () => {
    setSearchOpen(false);
  }

  // on click outside
  useOnClickOutside(searchRef, closeSearch);

  return(
    <header className={`site-header ${!onTop ? 'site-header--fixed' : ''}`}>
      <div className="container">
        <Link href="/">
          <a><h1 className="site-logo"><Logo />Sivchenko-Shop</h1></a>
        </Link>
        <nav ref={navRef} className={`site-nav`}/>
        <div className="site-header__actions">
          <Link href="/cart">
            <button className="btn-cart">
              <i className="icon-cart"></i>
              {cartItems.length > 0 && 
                <span className="btn-cart__count">{cartItems.length}</span>
              }
            </button>
          </Link>
        </div>
      </div>
    </header>
  )
};


export default Header;
