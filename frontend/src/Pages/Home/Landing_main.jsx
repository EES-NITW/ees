import Particles from "../../components/Particles";
import Navbar from "../../components/Navbar";
import "./Landing_main.css";
import DeptImage from "../../assets/eee-dept.png";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaGlobe,
  FaEnvelope,
} from "react-icons/fa";

const Landing2 = () => {
  return (
    <div className="w-full min-h-screen relative bg-black">
      <div className="header">
        <p className="text-blue-400 tracking-wide text-sm mb-3 mt-4">
          EST. 2002
        </p>
        <h1 className="text-3xl md:text-5xl font-semibold leading-snug md:leading-tight max-w-4xl mb-6">
          Rooted in Tradition, Committed to Progress - Powering Electrical
          Engineering Then, Now and Beyond.
        </h1>
        <p className="max-w-2xl text-gray-300 text-lg md:text-xl mb-10 ">
          The Electrical Engineering Society at NITW fosters innovation,
          collaboration, and technical excellence - bridging theory with
          real-world impact.
        </p>
        <a
          href="https://www.nitw.ac.in/eee"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3 bg-blue-400 text-black rounded-full font-medium hover:bg-gray-100 transition"
        >
          <FaGlobe />
          <span>NITW EE</span>
        </a>
      </div>

      <div className="content">
        <div className="relative w-full bg-black py-6 px-4 md:px-10">
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-gray-900 to-black rounded-3xl shadow-xl border border-gray-700/60 p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2">
              <img
                src={DeptImage}
                alt="Electrical Engineering Department"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <div className="w-full md:w-1/2 text-gray-200 text-base md:text-lg leading-relaxed text-center">
              <p className="mb-4 font-serif text-[22px]">
                The Electrical Engineering Department is one of the oldest
                departments of the National Institute of Technology, Warangal.
              </p>
              <p className="mb-4 font-serif text-[22px]">
                Since its inception, the department has actively engaged in
                teaching and research across diverse areas of Electrical
                Engineering, supported by experienced faculty and strong
                laboratories.
              </p>
            </div>
          </div>
        </div>
        <div className="relative w-full bg-black py-6 px-4 md:px-10">
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-gray-900 to-black rounded-3xl shadow-xl border border-gray-700/60 p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2 text-gray-200 text-base md:text-lg leading-relaxed text-center">
              <p className="mb-4 font-serif text-[22px]">
                We connect ideas, engineer solutions, and illuminate the path to
                a brighter, more electrifying tomorrow.Innovation is the key to
                progress, and we, as a society, are constantly evolving.
              </p>
              <p className="mb-4 font-serif text-[22px]">
                The current of innovation flows here, so we step up and tranform
                the things in whole new ways. Things don't work in series,
                that's why we work in parallel things in whole new ways.
              </p>
            </div>
            <div className="w-full md:w-1/2 h-70">
              <img
                src="https://www.nchasia.com/wp-content/resources/2023/10/electrical-maintenance.png"
                alt="Electrical Engineering Department"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-15 text-center mb-20 mt-10">
          <div>
            <p className="text-3xl md:text-4xl font-bold text-blue-400">120+</p>
            <p className="mt-2 text-sm md:text-base text-gray-300 font-mont font-semibold">
              Active Members
            </p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold text-blue-400">50+</p>
            <p className="mt-2 text-sm md:text-base text-gray-300 font-mont font-semibold">
              Events Hosted
            </p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold text-blue-400">25+</p>
            <p className="mt-2 text-sm md:text-base text-gray-300 font-mont font-semibold">
              Workshops
            </p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold text-blue-400">90%+</p>
            <p className="mt-2 text-sm md:text-base text-gray-300 font-mont font-semibold">
              Placement Rate
            </p>
          </div>
        </div>
      </div>

      <div className="footer">
        <div className="footer1">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPgAAADLCAMAAAB04a46AAAAjVBMVEUODg7///8AAAD8/PwKCgoGBgb39/fo6Ojb29v5+fn19fU+Pj5wcHC+vr7n5+fr6+vh4eFISEh5eXliYmLHx8eqqqrU1NRZWVmenp5AQEBra2tTU1OIiIgtLS0TExO4uLglJSWlpaWTk5M3NzdLS0sgICCNjY0xMTF1dXV+fn7ExMS6urqWlpYoKCjOzs7dvdmOAAANLklEQVR4nO1diXaqOhRtTgICDoAWHOs8VKv+/+e9DKgQgqWALdyXfdfq82mr2Tk5Y07i25uGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhkaTQUCA/PVAfhOcsT+YdDqTIfmf8Oc8t/31yUUCttt7n03a9Fnjr8f2OhiU3vT8Ljhj+k/8l8HtHi//qOCprD/6XUYaU672jTH9PzoFNntgnf1/jzqlPTjFRByxvoNTR8ibzQH+eqwVgq7xvodywVmN/xnqBC57S6zwPMCL6T9h6Ogi3zPNtvPx5r8V7JovdKrb1zinfNTdftOFDodFProy+2DZZANPYODmFbQMa9hc5gAzO79RS0qc/tGoqeYdlgEXd0GRI7RYNpI5TL1i0n7A2jaPOYFh6x6PFwRGzqBpzAn0HbuswG0budNmMScwK8dZCJzCmTSJOZV3ed4RnGGDmEPfrIo4Ru64Mcxh4NgV8WYhvvXREOYwdNUkuFNXLYVnRpC+dDIaEcPBxXoiQVZwsd1rsO5PJpPO53EUhC7mhagn5M9NEDl5Oz2THnKuq+EF4viYrkMHPYvw7CY4Ndg/i1paI18uqBJWgxyPek9WCbLqH7yC7yh5syVuXlkpVaWvBGD3ebXV9TiGRd1TNWN+VQxb4LR9Vjyn3P0unyDlxHVqLnI4Z+lqr/9d7ZhSP/Yy/3xZ65IMtJ0McQcfORYrgUM3a72M6ixyAkFqwHzlup2cRQWAvYOVUnc2NWYOW1PBGyNvm9s20XRWVYHHtbZvBL5SoSrj/f6jmBM2V5XIMapvtgJDWxGj4/cfVslh964UebeuxAkoLdPPgw+4XFV6btY1WQHfVixRr4BRgkOIFP58X1fiIwXvVqFsGjaeag7famneyNxKDxYXrBbCVrUTUc8yFAxSrDFaFfVB0E/vMtqnehJPBS8YX+dFA00Ci1TzAHJ2NYxbjUu67uL4xUUEm1aKeC1TFVVhtZQZhn5qqaP3OhJfJK0R/Z+wlBWmYYE0lRi5pHZ2ncyTJRTmhksaYRoIpix7/cJW8FMr3SpZHCWQrt7160d8JkVaGB3LDpKKXH7P+mXlsEJ2coy9XVl9JJDKVsK65aYEpFzSxhUIJ23Y3XndiM9b0lJ3KtjyIpDam6jbRhpsTMkCVxJeUgWSULcQJrUocSUjTHu0Wd2IzyTizkdGWG08Rk4eDzN+mbzJGyxB3YivpQFmmV843BNVY353eIafUYWFbtJZ0PetfvBlkErN1DadwPJ62wAk0LuzgD1rWlZMFStuJNa6VTN/BnLnprIAAXC0W/eRQ2t9J95H9sxXBOIwkWIYr17ECYRJ3qYqIYX+Na6kMLoH88bSVa8S8CXivboRlxyu01YRn9BX1g/inVlsEhBqKbbHWJaP60zckIi7B5WdZpbgYfVg9qiUU69gq7SDR4SJGa1X6EYMad/HU44PhtRUbR7Gzb1NAhxa6EtpDqVaPTYvtao+pSSuZkHmVJXDaGMFOgitxEPCvKE6NJGtpvs7S518D0OMXCKekaFQG4ipRxJgsclRPBzQCVH3ucjEb1Y9x8jK8BY/ku8ivTtX5tzEWQM76s76k+PM4nXT9azfX7Mdo6vSKmQRZycWDYYMsnOG4rx3V9d1W71ei8EVaCXQa3FjJdmg7IIBjEdy8ZSbrNMkK3STIiOL/xohJ4+jF0M0JD5Kz+29b4pbA5g86UW6gRurZBr1hDg7WjocUEzYj8FQ/Pxgz+cifoXbs8+bRrFVKoGFXffbnnPeTJ9MUjKJQ3t/9Hc7vhA7I4CPzobQh+OJP9yry2kycWEOwXveEUjjpHnJSiesVFugcXCjBJ95iLPtNRrVUTiOQ1ft0ESmSx9SFmaWO5OI87yGkOcNgcjelz6+RWDiPo7+qsArvrCN/wrOyB6pH6eCsm0bs5YRiy0TjGyTtTpjrN73l3eSBuLTsgaDebtYa1CF04P2s/ORWFR8mYfGj+eyxDdD5mnm+/74yImzn+eN728/uw5ylQ1dklXH3Pbz2DdjOHSkp0M1uSssFa0ZD3CtY/7sQZz6alXkRoj1vhWOm4ks5MQH4on2Qh3BwCmx2ESozrrpMpmjgFTDmyn6+Yk+if2s+A4SJe6qCjCw3ke2G3xOnNWrPqNnYN9VTBYNCRMfLfRBDuDjcGYVns4k8OlkLncRUki1J2V2Np/eY/M2J84s4uIeuqt22mATb43FYlUQI6ONkI7Qm1Yb0/LuMzVxzB0mDJJldeUG8SMZm96JPzZAlWnNNME7sm1+Bm/6bpW3AcLHu5o4FpvBxiXZtZzdAsK6tCPiHf4zM3hhH3uMnb+mBpsvJP53qpHYwVvVvLlHV8oc46uwbtfEi2l/Ji4+MWA5W63OzFZbvHnECVZB0PWjxEVWT1jhWLMkjtQq3TjKYZb33iowRceplk0Km3sP2CeetOTsiCyZG2u3N3fD5Gwe6hFsxuxlfyP9FU3HH/Np44WYYw+lOyip9568KGUlMOwpPjGKpmBsP1VyYxwsFovTKVac8+yomQ3b1vtpsQiCQHJphHiJjxpGKp7ursLYe+FBVDgo/Ui01pPefi0Pw4hWcyegDJlZ9uYnKkSTTkfQiV6TTROdzXhc1CKRF1eoXPelfY8wD2ho7Zg30OjTdExRYJN2kVI7CuAHX19fXRGwLJAIYGw6a1EA89X9CuXjRuyAS4zkIkrNWHyfRGv94sPmBnxs2u1xeyxA1XI8bm/ES6xE/NAEU1p5xkUk4nwXldtli08Vd2dMiZhMB8nJkqvWohGEsCEksclzDKA09TTEK1KSvJKIt2ddfs8N2wvh9vxBHHyXvbTofy4T44dBwqRcb2Wn9Aj+tALJ2MQVUopaDRb5YpNnbknisGNH7J2jfNmT3A5dty3iG8g8jMfrdirpIMws2awlleWnlLiI3IhIRD5TF5zBNNEz6Naxr5EDBolw/irpHZm3+zxrd3c8cvM4cWrc1ryFbTgdMsQ6Z6SUNFAoWWyxv1LJVfqdgIfjKZokcmrWu188ez1xifc48ZDVMGwUdrvdFcXocicA7eT20Xl+EFYtbtsiK9veHIoXVb/n3T4Hp9OpmwHqkJ2YjlPJSm6ZzxtPpc99TrzPLrKbMv9/vs9dTOBS/7vjxj1pDDarZbnh6+6TIJcVeg4pc1UcHCKi3uTciFOlp1HXnv6i/KuwdVKZcEZ+yKfl84XtnlEBLvdtAKo2fc5cLIhbyGMeFV5Y0eSWOdus5JP/hFchgO+hdLyeCUthiMmtZuHytYxZC6SqBHHMPb30Ld4vr3Z1sFtkLDglVCcUSFQya0Vx2UzJe5Nx7YASv3E7EvzsppNUrsKZj9hLLlisyrBX8TZUZ8+y4LwqH5WHPXG+22R4wFaFW+wMKjVwPOdcqwZNvt8jivCCMls2YBPmX+7K20wIi03wzrNpVKIstQ3sfCaUldl+8TYBILmvp8Oop6o7GkzmGw99qXkP3dyXgv3u5WeG0NJ8g2upmDOZD1snZVrFY/R8vJ3PX24GIvDJb3XJ5dk8VXHEMFb+Ws27nWNzmn04Nj1V+f61IJFHzyUYS+VlCRjqdb5t5ZM2/vE55WoAb0zR843Ry7+Nx46V5gwOV390t6EhOlpyIcybS8M455W9GYHPr4BAu3sNQysb3g2tIF8KAdOwxTtb2B89eeMwPP3pbUDf5ecx5JSOop6WhddSqwY/yRjLd6lpaFSMbPWrshz6ROv/SB9g25mw2+hkTCaDirpv+KeAz9oBBZKf0yl9lrHgkLJrJNVdJAt+mPUhRe+fqGBQfK873QNHI/iqLuMib4p7EEUz21fJ3sUyABioWgzZuCqSBl1V6b1w9lTvj79vAHZfConYVR37Zdul6bgd812VCt6+DAyYtGSh84S1miOWg1RhnaUHXi0unQdeH0uJJaxgM4ttQ0owaS68/nNxC4hthtRyrOBWg9SJVbaYrHYdxC0Au9S9XjaySt/MBB+K0wx/lYSrAXB0I7530eDSIpd6dVm5J/y1UnJOEFgukpqOSxt2Y9eLvRv/d66VuAUAOvEaIZuCsvfAzOSZfPHGYEEQ2K0epSg25LDUcUiysxITadf360MMGFro/s0Jt5bHoribdMyL2Nd6ijsCzFfxvR/lOYWcMOb3qqOJsFkX350FA7bX2PIsEb4lmoJrZ8wVgGh3iRMvLnJ2vvjux+qr3XHQQM6627fPoiPm17SLq7ebIG4BmI/sKGkuKnJjaQniyDkbTRC3ADfvor+l4CV+sEb8TlrcHHELwC7gnVwFSzG88MK+ZmL0h2WWYjCg42F2nLLQHUWw5z4xHDTwG/5YIMcuvlLfFvEccGDNnHhU2ZHB34UBAxa9F0jSYM16eiYNFHcE2NA83ftx752x85C9avS3OQJMPPmoQo6/WqPrtBExSzYIXK7oh+eijIO7aKh2x0GjmR8aduivjcZqdwwEftpCv2uydsfxUxr/CG0NDQ0NDQ0NDQ0NDQ0NDQ0NDY3/D/4DG8a2Vqx9UzEAAAAASUVORK5CYII="
            alt="ees_logo"
            className="footer-logo"
          ></img>
          <div className="footer-cont">
            <h2 className="footer-text">EES | NITW</h2>
            <div className="mb-10 flex items-center gap-6">
              <a
                href="https://www.nitw.ac.in/nitw/index.php/departments/electrical-engineering-"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white hover:underline"
              >
                <FaGlobe className="text-white" />
                <span>NITW EE Page</span>
              </a>
              <a
                href="mailto:eed_eea@nitw.ac.in"
                className="flex items-center gap-2 text-white hover:underline"
              >
                <FaEnvelope className="text-white" title="Email" />
                <span>Email</span>
              </a>
            </div>
            <div className="icons">
              <a
                href="https://www.facebook.com/eeanitw/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center border border-gray-400 rounded-full text-white hover:text-blue-600 hover:border-blue-600 transition-colors"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="https://www.instagram.com/nitw_ees/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center border border-gray-400 rounded-full text-white hover:text-pink-500 hover:border-pink-500 transition-colors"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://www.linkedin.com/company/electrical-engineering-society-ees-nit-warangal/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center border border-gray-400 rounded-full text-white hover:text-blue-600 hover:border-blue-600 transition-colors"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
          <img
            src="data:image/png;base64,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"
            alt="NITW_logo"
            className="footer-logo"
          ></img>
        </div>
        <div className="footer2 text-gray-300">
          <p>
            © Electrical Engineering Society, NIT Warangal. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing2;
