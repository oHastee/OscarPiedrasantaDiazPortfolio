import React, { Component } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Badge from "react-bootstrap/Badge";

class Experience extends Component {
  render() {
    let sectionName = "";
    let work = [];

    if (this.props.resumeExperience && this.props.resumeBasicInfo) {
      sectionName = this.props.resumeBasicInfo.section_name.experience;
      work = this.props.resumeExperience.map((workItem, i) => {
        // 1) Decide which icon to display for each job
        let iconClass;
        if (i === 0) {
          // First job => Spring Boot
          iconClass = "devicon-spring-plain experience-icon";
        } else if (i === 1) {
          // Second job => React
          iconClass = "devicon-react-original experience-icon";
        } else {
          // Fallback for other jobs => Angular or any default
          iconClass = "fab fa-angular experience-icon";
        }

        // 2) Main Tech badges
        const mainTech = workItem.mainTech.map((technology, index) => (
            <Badge pill className="main-badge mr-2 mb-2" key={index}>
              {technology}
            </Badge>
        ));

        // 3) Additional Tech badges
        const tech = workItem.technologies.map((technology, index) => (
            <Badge pill className="experience-badge mr-2 mb-2" key={index}>
              {technology}
            </Badge>
        ));

        return (
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                date={workItem.years}
                iconStyle={{
                    background: "#AE944F",
                    color: "#fff",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                icon={<i className={iconClass} style={{ fontSize: "2.8rem" }}></i>}
                key={i}
            >
                <div style={{ textAlign: "left", marginBottom: "4px" }}>{mainTech}</div>

                <h3 className="vertical-timeline-element-title" style={{ textAlign: "left" }}>
                    {workItem.title}
                </h3>
                <h4 className="vertical-timeline-element-subtitle" style={{ textAlign: "left" }}>
                    {workItem.company}
                </h4>
                <div style={{ textAlign: "left", marginTop: "15px" }}>{tech}</div>
            </VerticalTimelineElement>

        );
      });
    }

    return (
        <section id="resume" className="pb-5">
          <div className="col-md-12 mx-auto">
            <div className="col-md-12">
              <h1 className="section-title" style={{ color: "black" }}>
              <span className="text-black" style={{ textAlign: "center" }}>
                {sectionName}
              </span>
              </h1>
            </div>
          </div>
          <div className="col-md-8 mx-auto">
            <VerticalTimeline>
              {work}
              {/* Timeline ending element */}
              <VerticalTimelineElement
                  iconStyle={{
                    background: "#AE944F",
                    color: "#fff",
                    textAlign: "center",
                  }}
                  icon={
                    <i className="fas fa-hourglass-start mx-auto experience-icon"></i>
                  }
              />
            </VerticalTimeline>
          </div>
        </section>
    );
  }
}

export default Experience;
