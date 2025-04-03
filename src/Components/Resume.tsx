import React from 'react';
import { Tag, Button } from 'antd';
import { FilePdfOutlined, GithubOutlined, LinkedinOutlined } from '@ant-design/icons';

const ResumeComp: React.FC = () => {
    const skill = [
        'JavaScript', 'TypeScript', 'HTML', 'React js/ts', 'Django Rest Framework',
        'Responsive Web Design', 'CSS 3', 'Python', 'Tailwind CSS', 'REST API'
    ];

    return (
        <div className="bg-gray-100 font-sans py-12">
            <div className="container mx-auto px-4">
                {/* Resume Card */}
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-4xl font-semibold text-gray-900">Kidus Surafel</h1>
                            <p className="text-xl text-gray-600">Web Developer</p>
                        </div>
                        <Button
                            type="primary"
                            icon={<FilePdfOutlined />}
                            href="/path/to/resume.pdf"
                            target="_blank"
                            size="large"
                        >
                            Download Resume
                        </Button>
                    </div>

                    {/* Summary */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Summary</h2>
                        <p className="text-gray-700">
                            I’m a passionate web developer specializing in React and JavaScript with hands-on experience in building responsive and dynamic web applications. My expertise spans front-end development with React and back-end development with Django. I’m committed to delivering high-quality code, creating engaging user experiences, and ensuring client satisfaction. Let’s collaborate on your next project!
                        </p>
                    </div>

                    {/* Technical Skills */}
                    <div className="mb-8 w-2/5">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Technical Skills</h2>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {skill.map((cat, index) => (
                                <Tag key={index} className="bg-gray-700 text-white rounded" color="cyan">
                                    {cat}
                                </Tag>
                            ))}
                        </div>
                    </div>

                    {/* Experience */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Experience</h2>
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Web Developer, ABC Company</h3>
                            <p className="text-gray-700">
                                Developed and maintained company website, implementing responsive design and optimizing performance. Collaborated with the design team to create visually appealing web pages.
                            </p>
                            <p className="text-gray-600">January 2020 - Present</p>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Frontend Developer, XYZ Agency</h3>
                            <p className="text-gray-700">
                                Worked on various client projects, translating design mockups into interactive web pages. Utilized modern web technologies to ensure cross-browser compatibility.
                            </p>
                            <p className="text-gray-600">June 2018 - December 2019</p>
                        </div>
                    </div>

                    {/* Education */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Education</h2>
                        <small className="mb-2 underline text-gray-600">Self-Taught</small>
                        <div className="flex gap-3">
                            <div className=" mb-4 mt-2">
                                <div className="flex">
                                    <h3 className="text-lg font-semibold text-gray-800"><img className="w-4 h-4" src="https://th.bing.com/th/id/OIP.cCv8qIE6ihB6eQ9NEh_eyAHaIh?rs=1&pid=ImgDetMain" />Harvard University</h3>
                                </div>
                                <small>CS50’s Introduction to Programming with Python</small>
                                <p className="text-gray-700"><a className="underline" href="https://cs50.harvard.edu/python/2022/" target="_blank">Link</a></p>
                                <p className="text-gray-600">Graduated in May 2022</p>
                            </div>
                            <div className="mb-4 mt-2">
                                <h3 className="text-lg font-semibold text-gray-800">Harvard University</h3>
                                <small>CS50’s Web Programming with Python and JavaScript</small>
                                <p className="text-gray-700"><a className="underline" href="https://cs50.harvard.edu/web/2020/" target="_blank">Link</a></p>
                                <p className="text-gray-600">Graduated in Dec 2022</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Contact</h2>
                        <ul className="list-disc list-inside text-gray-700">
                            <li>Email: <a href="mailto:seeh51593@gmail.com" className="text-blue-500 hover:underline">seeh51593@gmail.com</a></li>
                            <li>LinkedIn:
                                <a href="https://www.linkedin.com/in/kidus-panda-6066aa359"
                                    className="text-blue-500 hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    linkedin.com/in/kidus-panda-6066aa359
                                </a>
                            </li>
                            <li>Website:
                                <a href="https://www.johndoe.com" className="text-blue-500 hover:underline">
                                    johndoe.com
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-4 mt-8">
                        <a href="https://github.com/kidus-panda"
                            className="text-gray-600 hover:text-gray-900"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <GithubOutlined className="text-2xl" />
                        </a>
                        <a href="https://www.linkedin.com/in/kidus-panda-6066aa359"
                            className="text-blue-600 hover:text-blue-800"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <LinkedinOutlined className="text-2xl" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeComp;