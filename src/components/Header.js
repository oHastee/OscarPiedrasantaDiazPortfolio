import React, { Component } from "react";
import Typical from "react-typical";
import Switch from "react-switch";

class Header extends Component {
    titles = [];

    constructor() {
        super();
        this.state = {
            checked: false,
            isMenuOpen: false,
            isMobile: window.innerWidth < 768,
        };
        this.onThemeSwitchChange = this.onThemeSwitchChange.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.handleNavClick = this.handleNavClick.bind(this);
        this.smoothScrollTo = this.smoothScrollTo.bind(this);
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ isMobile: window.innerWidth < 768 });
    }

    toggleMenu() {
        this.setState((prevState) => ({ isMenuOpen: !prevState.isMenuOpen }));
    }

    onThemeSwitchChange(checked) {
        this.setState({ checked });
        this.setTheme();
    }

    setTheme() {
        const dataThemeAttribute = "data-theme";
        const body = document.body;
        const newTheme =
            body.getAttribute(dataThemeAttribute) === "dark" ? "light" : "dark";
        body.setAttribute(dataThemeAttribute, newTheme);
    }

    // Custom smooth scroll that adjusts duration based on the distance
    smoothScrollTo(targetY) {
        const startY = window.scrollY;
        const distance = targetY - startY;
        const speed = 1; // pixels per millisecond (adjust this constant to control overall speed)
        const duration = Math.abs(distance) / speed;
        let startTime = null;

        // Easing function for smoother effect
        function easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const easing = easeInOutQuad(progress);
            window.scrollTo(0, startY + distance * easing);
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    }

    // Handle clicks for in-page navigation
    handleNavClick(e, targetId) {
        e.preventDefault();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            // Adjust target offset if needed (for example, if you have a fixed header)
            const targetPosition = targetElement.offsetTop;
            this.smoothScrollTo(targetPosition);
            // If on mobile, close the dropdown after navigating
            if (this.state.isMobile) {
                this.setState({ isMenuOpen: false });
            }
        }
    }

    render() {
        if (this.props.sharedData) {
            var name = this.props.sharedData.name;
            this.titles = this.props.sharedData.titles
                .map((x) => [x.toUpperCase(), 1500])
                .flat();
        }

        const HeaderTitleTypeAnimation = React.memo(
            () => <Typical className="title-styles" steps={this.titles} loop={50} />,
            () => true
        );

        // Navigation items array – note that external links (like "View Resume") are not handled with custom scroll.
        const navItems = [
            { label: "About Me", href: "#about" },
            { label: "Projects", href: "#portfolio" },
            { label: "Skills", href: "#skills" },
            { label: "Experience", href: "#resume" },
            {
                label: "View Resume",
                href: "/Resume_New.pdf",
                external: true,
            },
        ];

        // Render navigation links using our custom handler for non-external links.
        const renderNavLinks = () =>
            navItems.map((item) => (
                <div key={item.label} style={styles.navItem}>
                    <a
                        href={item.href}
                        onClick={
                            item.external
                                ? null
                                : (e) => this.handleNavClick(e, item.href.substring(1))
                        }
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noopener noreferrer" : undefined}
                        style={styles.navAnchor}
                    >
                        {item.label}
                    </a>
                </div>
            ));

        return (
            <header
                id="home"
                style={{ height: window.innerHeight - 140, display: "block" }}
            >
                {/* Navigation Bar */}
                {!this.state.isMobile ? (
                    // Desktop / Tablet: Display all links in a row at the top-right
                    <div style={styles.navContainer}>{renderNavLinks()}</div>
                ) : (
                    // Mobile: Hamburger icon + dropdown menu
                    <div style={styles.mobileNavContainer}>
                        <div style={styles.hamburgerIcon} onClick={this.toggleMenu}>
                            &#9776;
                        </div>
                        {this.state.isMenuOpen && (
                            <div style={styles.dropdownMenu}>{renderNavLinks()}</div>
                        )}
                    </div>
                )}

                <div className="row aligner" style={{ height: "100%" }}>
                    <div className="col-md-12">
                        <div>
              <span
                  className="iconify header-icon"
                  data-icon="la:laptop-code"
                  data-inline="false"
              ></span>
                            <br />
                            <h1 className="mb-0">
                                <Typical steps={[name]} wrapper="p" />
                            </h1>
                            <div className="title-container">
                                <HeaderTitleTypeAnimation />
                            </div>
                            <Switch
                                checked={this.state.checked}
                                onChange={this.onThemeSwitchChange}
                                offColor="#baaa80"
                                onColor="#353535"
                                className="react-switch mx-auto"
                                width={90}
                                height={40}
                                uncheckedIcon={
                                    <span
                                        className="iconify"
                                        data-icon="twemoji:owl"
                                        data-inline="false"
                                        style={{
                                            display: "block",
                                            height: "100%",
                                            fontSize: 25,
                                            textAlign: "end",
                                            marginLeft: "20px",
                                            color: "#353239",
                                        }}
                                    ></span>
                                }
                                checkedIcon={
                                    <span
                                        className="iconify"
                                        data-icon="noto-v1:sun-with-face"
                                        data-inline="false"
                                        style={{
                                            display: "block",
                                            height: "100%",
                                            fontSize: 25,
                                            textAlign: "end",
                                            marginLeft: "10px",
                                            color: "#353239",
                                        }}
                                    ></span>
                                }
                                id="icon-switch"
                            />
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

const styles = {
    navContainer: {
        position: "absolute",
        top: "1rem",
        right: "1rem",
        display: "flex",
        gap: "1rem",
        zIndex: 1000,
    },
    mobileNavContainer: {
        position: "absolute",
        top: "1rem",
        right: "1rem",
        zIndex: 1000,
    },
    navItem: {
        padding: "0.5rem 1rem",
        backgroundColor: "rgba(0,0,0,0.6)",
        borderRadius: "0.5rem",
    },
    navAnchor: {
        color: "#fff",
        fontSize: "1.5rem",
        textDecoration: "none",
    },
    hamburgerIcon: {
        fontSize: "2rem",
        color: "#fff",
        cursor: "pointer",
    },
    dropdownMenu: {
        marginTop: "0.5rem",
        backgroundColor: "rgba(0,0,0,0.8)",
        borderRadius: "0.5rem",
        padding: "0.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
    },
};

export default Header;
