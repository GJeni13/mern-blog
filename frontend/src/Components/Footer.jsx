import { Footer } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { FaSquareFacebook} from "react-icons/fa6";
import { ImInstagram } from "react-icons/im";
import { ImTwitter } from "react-icons/im";
import { VscGithub } from "react-icons/vsc";

export default function FooterCom() {
  return (
   <Footer container className="border border-t-8 border-teal-500">
    <div className="w-fulll max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1"> 
            <div className="mt-5"> 
            <Link to="/" className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white">
<span className="mt-2 px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">Blogging Platform</span>

</Link>
            </div>
            <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
              <div>
                <Footer.Title title='About' />
                <Footer.LinkGroup col>
                  <Footer.Link href='https.bloggingplatform.com' target='_blank' rel='noopener noreferrer'>
                    Blogging Platform
                  </Footer.Link>
                
                
                <Footer.Link href='/about' target='_blank' rel='noopener noreferrer'>
                    Jenitta Blog
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title='Follow us' />
                <Footer.LinkGroup col>
                  <Footer.Link href='https://github.com/GJeni13' target='_blank' rel='noopener noreferrer'>
                    Github
                  </Footer.Link>
                
                
                <Footer.Link href='#' >
                    Discord
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title='Legal' />
                <Footer.LinkGroup col>
                  <Footer.Link href='#' >
                    Privacy Policy
                  </Footer.Link>
                
                
                <Footer.Link href='#' >
                  Terms &amp; Conditions
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
            </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
<Footer.Copyright href='#'by="Jenitta's blog" year={new Date ().getFullYear()}/>
<div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
  <Footer.Icon href='https://facebook.com/jenittaAjith' icon={FaSquareFacebook }/> 
  <Footer.Icon href='https:/instagram.com/@jenitta_Ajith' icon={ImInstagram}/> 
  <Footer.Icon href='https:/twitter.com' icon={ImTwitter}/> 
  <Footer.Icon href='https://github.com/GJeni13' icon={VscGithub }/> 
  



</div>
        </div>
    </div>
    </Footer>
  )
}
