import { React, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { useMediaQuery } from "react-responsive";
import "./Header.css";
import down from "../../images/chevron-down.png";

const Header = ({ logged, isAuth, logoutHandler }) => {
  // console.log("isAuth", isAuth);
  // window.location.reload();
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const [mostrarOpciones, setMostrarOpciones] = useState(false);
  const location = useLocation();

  const handleClick = () => {
    // Navegar a la ruta solo si no estamos en /propiedades
    if (location.pathname !== "/propiedades") {
      navigate("/propiedades");
    }
  };
  const toggleOpciones = () => {
    setMostrarOpciones(!mostrarOpciones);
  };

  const openMobileMenu = () => {
    setMenu(!menu);
    console.log(menu);
  };

  const accessLogin = () => {
    navigate("/Login");
    window.location.reload();
  };

  const handleAuth = (value) => {
    const token = localStorage.getItem("token");
    console.log("token handle", token);
    fetch("http://localhost:2001/auth/dropdown", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        return response.json();
      })
      .then((data) => {
        if (value === "account") {
          navigate(`/Account/${data.id}`);
        } else if (value === "propiedades") {
          navigate(`/Propiedades/${data.id}`);
        } else if (value === "favoritos") {
          navigate(`/Favoritos/${data.id}`);
        } else {
          navigate(`/Catalogo/${data.id}`);
        }
        console.log("data from authenthication", data);
      })
      .catch((err) => {
        console.error("isAuth ERROR", err);
        if (err.text) {
          return err.text().then((errorMessage) => {
            console.error("Error message from server:", errorMessage);
          });
        } else {
          console.error("Error message from server:", err.message);
        }
      });
  };

  console.log(menu);

  console.log("Logged in:", logged);

  return (
    // absolute top left
    <div className="">
      <div className="header-shadow   flex h-20 w-full ">
        <div className="ajusta m-auto flex h-full w-full flex-row  ">
          <div className="m-auto flex h-3/4 w-9/12  sm:w-1/2 md:w-1/2 md:border-r  lg:w-1/2 lg:border-r xl:w-1/2 xl:border-r">
            <div className="m-auto ml-0 w-auto cursor-pointer  sm:m-auto sm:ml-0 sm:w-auto md:w-auto lg:w-2/5 xl:w-2/5">
              <Link to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="180"
                  height="23"
                  viewBox="0 0 180 23"
                  fill="none"
                >
                  <path
                    d="M46.163 2.71165C48.1877 2.71165 49.7568 3.13828 50.8704 3.99155C51.9984 4.83035 52.5625 6.06686 52.5625 7.70108C52.5625 9.40762 52.0201 10.7092 50.9355 11.6059C49.8508 12.4881 48.3901 12.9291 46.5535 12.9291H45.0132V17.7884H41V2.71165H46.163ZM46.1847 10.0656C46.9367 10.0656 47.5007 9.87764 47.8767 9.50162C48.2672 9.1256 48.4625 8.53266 48.4625 7.72278C48.4625 6.2621 47.6743 5.53177 46.0979 5.53177H45.0132V10.0656H46.1847Z"
                    fill="#0F3D71"
                  />
                  <path
                    d="M59.6548 5.87886C60.0308 5.87886 60.4213 5.94394 60.8262 6.0741L60.1971 9.80533C59.8211 9.68963 59.474 9.63178 59.1558 9.63178C58.5051 9.63178 58.0061 9.85594 57.659 10.3043C57.3264 10.7381 57.0661 11.4034 56.8781 12.3V17.7884H53.0167V6.22595H56.3791L56.7262 8.41696C56.9576 7.65047 57.3409 7.03583 57.8759 6.57304C58.4255 6.11025 59.0185 5.87886 59.6548 5.87886Z"
                    fill="#0F3D71"
                  />
                  <path
                    d="M65.7072 5.83547C67.515 5.83547 68.9322 6.3778 69.9591 7.46246C70.9859 8.54712 71.4993 10.0656 71.4993 12.018C71.4993 13.2618 71.2679 14.3464 70.8051 15.272C70.3423 16.1976 69.6698 16.9135 68.7876 17.4196C67.9199 17.9258 66.8931 18.1789 65.7072 18.1789C63.8994 18.1789 62.4821 17.6366 61.4553 16.5519C60.4285 15.4673 59.9151 13.9487 59.9151 11.9963C59.9151 10.7526 60.1465 9.66794 60.6093 8.74236C61.0721 7.81678 61.7373 7.10091 62.6051 6.59473C63.4873 6.08856 64.5213 5.83547 65.7072 5.83547ZM65.7072 8.63389C65.0853 8.63389 64.6225 8.90867 64.3188 9.45823C64.0296 9.99333 63.885 10.8394 63.885 11.9963C63.885 13.1967 64.0296 14.0644 64.3188 14.5995C64.6225 15.1202 65.0853 15.3805 65.7072 15.3805C66.3291 15.3805 66.7846 15.1129 67.0739 14.5778C67.3776 14.0283 67.5294 13.175 67.5294 12.018C67.5294 10.8321 67.3776 9.97164 67.0739 9.43654C66.7846 8.90144 66.3291 8.63389 65.7072 8.63389Z"
                    fill="#0F3D71"
                  />
                  <path
                    d="M79.3953 5.83547C80.8415 5.83547 81.9261 6.3778 82.6492 7.46246C83.3723 8.53266 83.7339 10.0367 83.7339 11.9746C83.7339 13.1605 83.5459 14.2235 83.1699 15.1635C82.7939 16.1036 82.2515 16.8412 81.5429 17.3763C80.8487 17.9114 80.0461 18.1789 79.1349 18.1789C77.9924 18.1789 77.0741 17.7884 76.3799 17.0075V22.2572L72.5185 22.6477V6.22595H75.946L76.1196 7.44077C76.5679 6.87674 77.0741 6.4718 77.6381 6.22595C78.2166 5.96563 78.8023 5.83547 79.3953 5.83547ZM77.8984 15.4022C79.1277 15.4022 79.7424 14.2741 79.7424 12.018C79.7424 10.702 79.605 9.81256 79.3302 9.34977C79.0699 8.87252 78.6722 8.63389 78.1371 8.63389C77.4429 8.63389 76.8572 9.03883 76.3799 9.84871V14.4911C76.5968 14.8092 76.821 15.0406 77.0524 15.1852C77.2983 15.3299 77.5803 15.4022 77.8984 15.4022Z"
                    fill="#0F3D71"
                  />
                  <path
                    d="M88.6942 6.22595V17.7884H84.8328V6.22595H88.6942ZM86.7635 0C87.4143 0 87.9422 0.20247 88.3471 0.60741C88.7665 1.01235 88.9762 1.51852 88.9762 2.12593C88.9762 2.73334 88.7665 3.23952 88.3471 3.64446C87.9422 4.0494 87.4143 4.25187 86.7635 4.25187C86.1127 4.25187 85.5776 4.0494 85.1582 3.64446C84.7533 3.23952 84.5508 2.73334 84.5508 2.12593C84.5508 1.51852 84.7533 1.01235 85.1582 0.60741C85.5776 0.20247 86.1127 0 86.7635 0Z"
                    fill="#0F3D71"
                  />
                  <path
                    d="M100.782 11.8228C100.782 11.9096 100.761 12.3434 100.717 13.1244H93.6451C93.7464 14.0066 93.9922 14.614 94.3827 14.9466C94.7877 15.2648 95.3589 15.4239 96.0965 15.4239C96.5303 15.4239 96.957 15.3443 97.3764 15.1852C97.8102 15.0117 98.2803 14.7514 98.7864 14.4043L100.348 16.5302C99.7409 17.0364 99.0467 17.4413 98.2658 17.745C97.4848 18.0343 96.6388 18.1789 95.7277 18.1789C93.7608 18.1789 92.264 17.6293 91.2372 16.5302C90.2249 15.4166 89.7187 13.927 89.7187 12.0614C89.7187 10.89 89.9284 9.83425 90.3478 8.89421C90.7816 7.95417 91.418 7.20937 92.2568 6.65981C93.0956 6.11025 94.1079 5.83547 95.2938 5.83547C96.9859 5.83547 98.3236 6.36334 99.3071 7.41907C100.29 8.46035 100.782 9.92825 100.782 11.8228ZM96.9859 10.7381C96.9714 9.97164 96.8413 9.37869 96.5954 8.95929C96.3496 8.53989 95.9374 8.33019 95.3589 8.33019C94.8238 8.33019 94.4189 8.5182 94.1441 8.89421C93.8693 9.27023 93.6958 9.92825 93.6235 10.8683H96.9859V10.7381Z"
                    fill="#0F3D71"
                  />
                  <path
                    d="M112.446 1.67038V17.7884H109.019L108.867 16.5085C108.52 17.0002 108.072 17.4052 107.522 17.7233C106.987 18.027 106.343 18.1789 105.591 18.1789C104.145 18.1789 103.053 17.6293 102.316 16.5302C101.578 15.4311 101.209 13.9126 101.209 11.9746C101.209 10.7887 101.405 9.73302 101.795 8.80744C102.2 7.8674 102.764 7.13706 103.487 6.61643C104.21 6.09579 105.042 5.83547 105.982 5.83547C107.023 5.83547 107.891 6.1681 108.585 6.83336V1.2799L112.446 1.67038ZM106.85 15.4022C107.544 15.4022 108.122 15.0189 108.585 14.2524V9.41485C108.339 9.14007 108.101 8.9376 107.869 8.80744C107.638 8.67728 107.37 8.6122 107.066 8.6122C106.488 8.6122 106.025 8.88698 105.678 9.43654C105.345 9.97164 105.179 10.8249 105.179 11.9963C105.179 13.2979 105.324 14.1946 105.613 14.6863C105.902 15.1635 106.314 15.4022 106.85 15.4022Z"
                    fill="#0F3D71"
                  />
                  <path
                    d="M123.632 14.2307C123.632 14.6501 123.682 14.9611 123.783 15.1635C123.899 15.366 124.094 15.5179 124.369 15.6191L123.588 18.1138C122.851 18.056 122.243 17.9041 121.766 17.6583C121.303 17.4124 120.927 17.0219 120.638 16.4868C119.9 17.6149 118.736 18.1789 117.145 18.1789C116.003 18.1789 115.084 17.8463 114.39 17.181C113.711 16.5013 113.371 15.6263 113.371 14.5561C113.371 13.2835 113.841 12.3073 114.781 11.6276C115.721 10.9478 117.08 10.608 118.859 10.608H119.857V10.2175C119.857 9.59562 119.727 9.17622 119.466 8.95929C119.206 8.7279 118.736 8.6122 118.056 8.6122C117.695 8.6122 117.239 8.67005 116.69 8.78574C116.155 8.88698 115.605 9.0316 115.041 9.21961L114.195 6.72489C114.889 6.43565 115.634 6.21872 116.429 6.0741C117.225 5.91501 117.962 5.83547 118.642 5.83547C120.378 5.83547 121.643 6.18256 122.438 6.87674C123.234 7.55646 123.632 8.60497 123.632 10.0223V14.2307ZM118.317 15.4672C118.635 15.4672 118.924 15.3877 119.184 15.2286C119.459 15.0551 119.683 14.8237 119.857 14.5344V12.6688H119.206C118.512 12.6688 117.999 12.799 117.666 13.0593C117.333 13.3052 117.167 13.6812 117.167 14.1874C117.167 14.5778 117.268 14.8888 117.471 15.1202C117.673 15.3516 117.955 15.4672 118.317 15.4672Z"
                    fill="#0F3D71"
                  />
                  <path
                    d="M136.079 1.67038V17.7884H132.652L132.5 16.5085C132.153 17.0002 131.704 17.4052 131.155 17.7233C130.62 18.027 129.976 18.1789 129.224 18.1789C127.778 18.1789 126.686 17.6293 125.949 16.5302C125.211 15.4311 124.842 13.9126 124.842 11.9746C124.842 10.7887 125.037 9.73302 125.428 8.80744C125.833 7.8674 126.397 7.13706 127.12 6.61643C127.843 6.09579 128.675 5.83547 129.615 5.83547C130.656 5.83547 131.524 6.1681 132.218 6.83336V1.2799L136.079 1.67038ZM130.482 15.4022C131.177 15.4022 131.755 15.0189 132.218 14.2524V9.41485C131.972 9.14007 131.733 8.9376 131.502 8.80744C131.271 8.67728 131.003 8.6122 130.699 8.6122C130.121 8.6122 129.658 8.88698 129.311 9.43654C128.978 9.97164 128.812 10.8249 128.812 11.9963C128.812 13.2979 128.957 14.1946 129.246 14.6863C129.535 15.1635 129.947 15.4022 130.482 15.4022Z"
                    fill="#0F3D71"
                  />
                  <path
                    d="M148.154 11.8228C148.154 11.9096 148.132 12.3434 148.089 13.1244H141.017C141.118 14.0066 141.364 14.614 141.754 14.9466C142.159 15.2648 142.731 15.4239 143.468 15.4239C143.902 15.4239 144.329 15.3443 144.748 15.1852C145.182 15.0117 145.652 14.7514 146.158 14.4043L147.72 16.5302C147.113 17.0364 146.418 17.4413 145.637 17.745C144.857 18.0343 144.01 18.1789 143.099 18.1789C141.133 18.1789 139.636 17.6293 138.609 16.5302C137.597 15.4166 137.09 13.927 137.09 12.0614C137.09 10.89 137.3 9.83425 137.719 8.89421C138.153 7.95417 138.79 7.20937 139.628 6.65981C140.467 6.11025 141.48 5.83547 142.665 5.83547C144.358 5.83547 145.695 6.36334 146.679 7.41907C147.662 8.46035 148.154 9.92825 148.154 11.8228ZM144.358 10.7381C144.343 9.97164 144.213 9.37869 143.967 8.95929C143.721 8.53989 143.309 8.33019 142.731 8.33019C142.195 8.33019 141.791 8.5182 141.516 8.89421C141.241 9.27023 141.067 9.92825 140.995 10.8683H144.358V10.7381Z"
                    fill="#0F3D71"
                  />
                  <path
                    d="M153.419 5.83547C154.257 5.83547 155.053 5.96563 155.805 6.22595C156.571 6.48627 157.222 6.84059 157.757 7.28892L156.369 9.41485C155.443 8.83636 154.51 8.54712 153.57 8.54712C153.165 8.54712 152.862 8.6122 152.659 8.74236C152.471 8.85806 152.377 9.02437 152.377 9.2413C152.377 9.42931 152.428 9.58116 152.529 9.69686C152.63 9.81256 152.84 9.94272 153.158 10.0873C153.491 10.2175 154.011 10.391 154.72 10.608C155.906 10.9551 156.781 11.4106 157.345 11.9746C157.909 12.5242 158.191 13.2979 158.191 14.2958C158.191 15.0768 157.96 15.7637 157.497 16.3567C157.049 16.9352 156.419 17.3835 155.61 17.7016C154.814 18.0198 153.91 18.1789 152.898 18.1789C151.914 18.1789 150.989 18.027 150.121 17.7233C149.268 17.4052 148.545 16.9713 147.952 16.4217L149.796 14.3609C150.244 14.708 150.721 14.9828 151.228 15.1852C151.748 15.3877 152.269 15.4889 152.789 15.4889C153.252 15.4889 153.607 15.4166 153.852 15.272C154.113 15.1129 154.243 14.8815 154.243 14.5778C154.243 14.3464 154.185 14.1657 154.069 14.0355C153.968 13.9053 153.766 13.7824 153.462 13.6667C153.158 13.5366 152.638 13.363 151.9 13.1461C149.658 12.4808 148.538 11.2588 148.538 9.47993C148.538 8.80021 148.733 8.18557 149.123 7.63601C149.514 7.07198 150.071 6.63089 150.794 6.31272C151.531 5.99455 152.406 5.83547 153.419 5.83547Z"
                    fill="#0F3D71"
                  />
                  <path
                    d="M171.278 2.71165L166.462 12.1699V17.7884H162.449V12.1916L157.633 2.71165H162.015L164.51 9.11114L167.026 2.71165H171.278Z"
                    fill="#0F3D71"
                  />
                  <path
                    d="M179.208 14.2307C179.208 14.6501 179.258 14.9611 179.36 15.1635C179.475 15.366 179.67 15.5179 179.945 15.6191L179.164 18.1138C178.427 18.056 177.819 17.9041 177.342 17.6583C176.879 17.4124 176.503 17.0219 176.214 16.4868C175.476 17.6149 174.312 18.1789 172.721 18.1789C171.579 18.1789 170.661 17.8463 169.966 17.181C169.287 16.5013 168.947 15.6263 168.947 14.5561C168.947 13.2835 169.417 12.3073 170.357 11.6276C171.297 10.9478 172.656 10.608 174.435 10.608H175.433V10.2175C175.433 9.59562 175.303 9.17622 175.043 8.95929C174.782 8.7279 174.312 8.6122 173.633 8.6122C173.271 8.6122 172.815 8.67005 172.266 8.78574C171.731 8.88698 171.181 9.0316 170.617 9.21961L169.771 6.72489C170.465 6.43565 171.21 6.21872 172.006 6.0741C172.801 5.91501 173.539 5.83547 174.218 5.83547C175.954 5.83547 177.219 6.18256 178.015 6.87674C178.81 7.55646 179.208 8.60497 179.208 10.0223V14.2307ZM173.893 15.4672C174.211 15.4672 174.5 15.3877 174.761 15.2286C175.035 15.0551 175.26 14.8237 175.433 14.5344V12.6688H174.782C174.088 12.6688 173.575 12.799 173.242 13.0593C172.909 13.3052 172.743 13.6812 172.743 14.1874C172.743 14.5778 172.844 14.8888 173.047 15.1202C173.249 15.3516 173.531 15.4672 173.893 15.4672Z"
                    fill="#0F3D71"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.31701 16.9612C0.589645 16.1299 0.676881 14.8638 1.51186 14.1332L15.7974 1.63332C16.6324 0.90272 17.8989 0.984329 18.6263 1.8156C19.3536 2.64688 19.2664 3.91303 18.4314 4.64363L4.14587 17.1435C3.3109 17.8741 2.04437 17.7925 1.31701 16.9612Z"
                    fill="#1D80F5"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.9613 1.50515C16.6887 0.67388 17.9552 0.592271 18.7902 1.32287L33.0757 13.8227C33.9107 14.5533 33.9979 15.8195 33.2706 16.6508C32.5432 17.482 31.2767 17.5636 30.4417 16.833L16.1562 4.33318C15.3212 3.60258 15.2339 2.33643 15.9613 1.50515Z"
                    fill="#1D80F5"
                  />
                  <path
                    d="M24 4C24 2.89543 24.8954 2 26 2H28C29.1046 2 30 2.89543 30 4V11.5455C30 11.7965 29.7965 12 29.5455 12H26C24.8954 12 24 11.1046 24 10V4Z"
                    fill="#1D80F5"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13 13C13 11.8954 13.8954 11 15 11H17V15H13V13ZM13 16V18C13 19.1046 13.8954 20 15 20H17V16H13ZM18 16V20H20C21.1046 20 22 19.1046 22 18V16H18ZM22 15V13C22 11.8954 21.1046 11 20 11H18V15H22Z"
                    fill="#1D80F5"
                  />
                </svg>
              </Link>
            </div>
            <div
              className="m-auto hidden w-30  cursor-pointer lg:block"
              onClick={handleClick}
            >
              <h1 className="text-center text-base font-semibold ">
                Propiedades
              </h1>
            </div>
            <div className="m-auto hidden w-30  cursor-pointer lg:block">
              <h1 className="text-center text-base font-semibold">
                <Link to="/Publica"> Publica tu propiedad</Link>
              </h1>
            </div>
          </div>
          <div className="m-auto flex h-3/4 w-1/2 border border-blue-700">
            <div className="m-auto hidden w-1/2 cursor-pointer border border-green-500  lg:block">
              <p className="ml-16 text-base font-semibold">
                <Link to="/Vacations">🏖️️ Un lugar para vacacionar</Link>
              </p>
            </div>
            <div className="m-auto hidden h-90 w-1/2  justify-end border  border-yellow-500  lg:flex ">
              <div className="hidden w-1/4 cursor-pointer items-center border border-red-600 lg:flex">
                {isAuth ? (
                  <p className="blue-new m-auto  border text-base font-bold text-blue-new">
                    {logged}
                  </p>
                ) : (
                  <p
                    onClick={accessLogin}
                    className="blue-new m-auto   text-base font-bold"
                  >
                    Acceder
                  </p>
                )}
              </div>
              <div className="relative my-auto w-auto border md:w-2/5">
                <div className=" hidden flex-row border border-green-400  text-center lg:flex    ">
                  <div
                    onClick={toggleOpciones}
                    className="flex h-full w-1/2 cursor-pointer items-center border"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      // width="auto"
                      // height="auto"
                      viewBox="0 0 46 46"
                      fill="none"
                      className="m-auto hidden h-full w-9 lg:flex"
                    >
                      <circle
                        cx="23"
                        cy="23"
                        r="21"
                        fill="#D9D9D9"
                        fillOpacity="0.2"
                      />
                      <circle
                        cx="23"
                        cy="23"
                        r="22"
                        stroke="black"
                        strokeOpacity="0.2"
                        strokeWidth="2"
                      />
                      <svg
                        x="10"
                        y="9"
                        xmlns="http://www.w3.org/2000/svg"
                        width="55%"
                        height="55%"
                        viewBox="0 0 22 25"
                        fill="none"
                      >
                        <path
                          d="M11 12.5C7.51339 12.5 4.71429 9.7168 4.71429 6.25C4.71429 2.83203 7.51339 0 11 0C14.4375 0 17.2857 2.83203 17.2857 6.25C17.2857 9.7168 14.4375 12.5 11 12.5ZM13.4554 14.8438C18.1696 14.8438 22 18.6523 22 23.3398C22 24.2676 21.2143 25 20.2812 25H1.66964C0.736607 25 0 24.2676 0 23.3398C0 18.6523 3.78125 14.8438 8.49554 14.8438H13.4554Z"
                          fill="black"
                          fillOpacity="0.1"
                        />
                      </svg>
                    </svg>
                    <img
                      className={`m-auto hidden h-auto w-4 select-none lg:flex ${
                        isAuth && mostrarOpciones ? "rotate-180" : "-rotate-0"
                      }`}
                      src={down}
                      alt="Hi"
                    ></img>
                  </div>

                  <div className="flex w-1/2  border">
                    <div className="m-auto flex w-full">
                      <div className="m-auto w-1/2  border-r">
                        <p className="cursor-pointer">EN</p>
                      </div>
                      <div className="m-auto w-1/2 ">
                        <p className="cursor-pointer">ES</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`absolute left-0 top-full hidden w-full ${
                      isAuth && mostrarOpciones ? "lg:block" : "hidden"
                    }`}
                  >
                    <div className=" rounded-md border bg-white shadow-2xl">
                      <div
                        onClick={() => handleAuth("account")}
                        className="flex cursor-pointer border-b border-slate-200 text-blue-new hover:bg-blue-dark hover:text-white"
                      >
                        <p className="m-auto">Account</p>
                      </div>
                      <div
                        onClick={() => handleAuth("propiedades")}
                        className="flex cursor-pointer border-b border-slate-200 text-blue-new hover:bg-blue-dark hover:text-white"
                      >
                        <p className="m-auto">Propiedades</p>
                      </div>
                      <div
                        onClick={() => handleAuth("catalogo")}
                        className="flex cursor-pointer border-b border-slate-200 text-blue-new hover:bg-blue-dark hover:text-white"
                      >
                        <p className="m-auto">Catalogo</p>
                      </div>
                      <div
                        onClick={() => handleAuth("favoritos")}
                        className="flex cursor-pointer border-b border-slate-200 text-blue-new hover:bg-blue-dark hover:text-white"
                      >
                        <p className="m-auto">Favoritos</p>
                      </div>
                      <div
                        onClick={logoutHandler}
                        className="flex cursor-pointer rounded-sm rounded-b-md border-slate-200 text-blue-new hover:bg-blue-dark hover:text-white"
                      >
                        <p className="m-auto">Log out</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* {isAuth && mostrarOpciones && ( */}
              </div>
            </div>

            <div
              onClick={openMobileMenu}
              className="menu my-auto ml-auto flex h-5 w-9 cursor-pointer flex-col justify-between border  lg:hidden "
            >
              <div
                className={` h-1 rounded-lg bg-new ${
                  menu ? "burger-bar" : "unclick"
                }`}
              ></div>
              <div
                className={` h-1 rounded-lg bg-new ${
                  menu ? "burger-bar" : "unclick"
                }`}
              ></div>
              <div
                className={` h-1 rounded-lg bg-new ${
                  menu ? "burger-bar" : "unclick"
                }`}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`buu m-auto inline-block h-auto w-full select-none  lg:hidden ${
          menu ? "menu-open" : "menu-closed"
        }`}
      >
        <div
          className={`m-auto flex w-11/12  select-none flex-col gap-1 rounded-md border bg-gray-50   pb-3 shadow-lg transition`}
        >
          <div className="w-full cursor-pointer ">
            <p className="flex h-9 items-center justify-center border font-fira-sans font-bold   text-new3">
              <Link to="/Propiedades"> Propiedades </Link>
            </p>
          </div>
          <div className="w-full cursor-pointer ">
            <p className="flex h-9 w-full items-center justify-center border font-fira-sans font-bold text-new3">
              <Link to="/Publica"> Publica tu propiedad</Link>
            </p>
          </div>
          <div className="w-full cursor-pointer ">
            <p className="m-auto flex h-9 w-full items-center justify-center border font-fira-sans font-bold text-new3">
              <Link to="/Vacations">
                🏖️️ Encuentra un lugar para vacacionar
              </Link>
            </p>
          </div>
          <div className="w-full cursor-pointer border bg-blue-new">
            <p className="m-auto  flex h-9 w-full items-center justify-center font-fira-sans font-bold  text-white">
              <Link to="/Login">Login</Link>
            </p>
          </div>
          <div className=" w-full  cursor-pointer border bg-blue-dark">
            <p className="m-auto flex h-9 w-full items-center justify-center font-fira-sans font-bold text-white">
              Register
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
