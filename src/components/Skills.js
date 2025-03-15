import React, { Component } from "react";

// Helper to chunk array into groups of 9
function chunkArray(array, size) {
    const results = [];
    for (let i = 0; i < array.length; i += size) {
        results.push(array.slice(i, i + size));
    }
    return results;
}

class Skills extends Component {
    render() {
        let sectionName = "";
        let skillsRows = [];

        if (this.props.sharedSkills && this.props.resumeBasicInfo) {
            sectionName = this.props.resumeBasicInfo.section_name.skills;
            const allIcons = this.props.sharedSkills.icons || [];

            // Break icons into rows of 9
            const chunkedIcons = chunkArray(allIcons, 9);

            // Map each chunk into its own row
            skillsRows = chunkedIcons.map((chunk, rowIndex) => {
                // Create a list of icons for this row
                const iconsList = chunk.map((skill, i) => {
                    // Build dynamic style for the icon
                    const iconStyle = { fontSize: "150%" };
                    // Only override color if colorOverride is provided
                    if (skill.colorOverride) {
                        iconStyle.color = skill.colorOverride;
                    }

                    return (
                        <li className="list-inline-item mx-3" key={i}>
                            <div className="text-center skills-tile">
                                <i className={skill.class} style={iconStyle}>
                                    <p
                                        className="text-center"
                                        style={{ fontSize: "60%", marginTop: "4px" }}
                                    >
                                        {skill.name}
                                    </p>
                                </i>
                            </div>
                        </li>
                    );
                });

                return (
                    <div className="col-md-12 text-center" style={{ marginTop: "20px" }} key={rowIndex}>
                        <ul className="list-inline mx-auto skill-icon" style={{ justifyContent: "center" }}>
                            {iconsList}
                        </ul>
                    </div>
                );
            });
        }

        return (
            <section id="skills">
                <div className="col-md-12">
                    <div className="col-md-12">
                        <h1 className="section-title">
                            <span className="text-white">{sectionName}</span>
                        </h1>
                    </div>
                    {skillsRows}
                </div>
            </section>
        );
    }
}

export default Skills;
