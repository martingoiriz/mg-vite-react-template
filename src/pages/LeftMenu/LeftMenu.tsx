import IonIcon from "@reacticons/ionicons";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const LayoutContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  position: relative;
`;

const Sidebar = styled.nav<{ $isMobile: boolean; $isSidebarOpen: boolean }>`
  width: 250px;
  padding: 20px;
  background-color: #2c3e50;
  color: white;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  position: fixed;
  height: 100vh;
  z-index: 100;

  @media (max-width: 768px) {
    transform: ${({ $isSidebarOpen }) => ($isSidebarOpen ? "translateX(0)" : "translateX(-100%)")};
    width: 200px;
  }
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  list-style: none;
  padding: 0;
  margin: 0;
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const NavItemLi = styled.li`
  display: flex;
  width: 25vw;
  margin-bottom: 15px;
`;

const NavButton = styled.button<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  width: 200px;
  padding: 12px;
  background: ${({ $isActive }) => ($isActive ? "#34495e" : "transparent")};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  color: ${({ $isActive }) => ($isActive ? "#ffffff" : "#bdc3c7")};
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.2s ease;

  @media (max-width: 768px) {
    width: auto;
  }

  div {
    span {
      height: auto !important;
      display: flex !important;
    }
  }

  &:hover {
    background-color: #34495e;
    color: #ffffff;
    transform: translateX(5px);
  }

  &:active {
    transform: translateX(0);
  }
`;

const MainContent = styled.main<{ $isMobile: boolean }>`
  flex: 1;
  padding: 20px;
  background-color: #ecf0f1;
  margin-left: ${({ $isMobile }) => ($isMobile ? "0" : "250px")};
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-top: 10vh;
    position: relative;
    margin-left: 0;
    min-height: 90vh;
  }
`;

const HamburgerMenu = styled.div`
  display: none;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 101;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MenuBar = styled.div`
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 10vh;
    background-color: #2c3e50;
    z-index: 99;
  }
`;

const NavItem = ({
  handleChangeRoute,
  path = "",
  iconName = "",
  navName = "",
}: {
  handleChangeRoute: (path: string) => void;
  path: string;
  iconName: any;
  navName: string;
}) => {
  const { pathname } = useLocation();
  const isActive = (path: string) => pathname === path;

  return (
    <NavItemLi>
      <NavButton onClick={() => handleChangeRoute(path)} $isActive={isActive(path)}>
        <div>
          <IonIcon name={iconName} />
        </div>
        <span>{navName}</span>
      </NavButton>
    </NavItemLi>
  );
};

const LeftMenu = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    // Add logout logic here
    console.log("Logging out...");
    navigate("/login");
  };

  const handleChangeRoute = (path: string) => {
    setIsSidebarOpen(false);
    navigate(path);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <LayoutContainer>
      {/* Hamburger Menu for Mobile */}
      <MenuBar>
        <HamburgerMenu onClick={toggleSidebar}>
          <IonIcon name={isSidebarOpen ? null : "menu"} size="large" color="white" />
        </HamburgerMenu>
      </MenuBar>

      {/* Sidebar */}
      <Sidebar $isMobile={isMobile} $isSidebarOpen={isSidebarOpen}>
        <NavList>
          <NavItem
            handleChangeRoute={handleChangeRoute}
            path="/home"
            iconName="home"
            navName="Home"
          />
          <NavItem
            handleChangeRoute={handleChangeRoute}
            path="/preferences"
            iconName="settings"
            navName="Preferences"
          />
          <NavItem
            handleChangeRoute={handleLogout}
            path="/logout"
            iconName="log-out"
            navName="Log out"
          />
        </NavList>
      </Sidebar>

      {/* Main Content */}
      <MainContent $isMobile={isMobile}>{children}</MainContent>
    </LayoutContainer>
  );
};

export default LeftMenu;
