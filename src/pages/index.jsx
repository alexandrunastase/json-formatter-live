import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <div class="shadow-lg dark:shadow-lg-dark rounded-lg" >
  <div
    class="bg-wash dark:bg-card-dark flex justify-between items-center relative z-10 border-b border-border dark:border-border-dark rounded-t-lg text-lg"
  >
    <div class="flex-1 grow min-w-0 px-4 lg:px-6">
      <div>
        <div class="relative overflow-hidden">
          <div class="w-[fit-content] invisible">
            <div class="sp-tabs" translate="no">
              <div
                aria-label="Select active file"
                class="sp-tabs-scrollable-container"
                role="tablist"
              >
                <button
                  aria-selected="true"
                  class="sp-tab-button"
                  data-active="true"
                  role="tab"
                  title="/App.js"
                  type="button"
                >
                  App.js
                </button>
              </div>
            </div>
          </div>
          <button
            class="absolute top-0 left-[2px]"
            id="headlessui-listbox-button-:rd:"
            aria-haspopup="true"
            aria-expanded="false"
            data-headlessui-state=""
            type="button"
          >
            <span
              class="h-full py-2 px-1 mt-px -mb-px flex border-b text-link dark:text-link-dark border-link dark:border-link-dark items-center text-md leading-tight truncate"
              
              >App.js</span
            >
          </button>
        </div>
      </div>
    </div>
    <div class="px-3 flex items-center justify-end text-right" translate="yes">
      <button
        class="text-sm text-primary dark:text-primary-dark inline-flex items-center hover:text-link duration-100 ease-in transition mx-1"
        title="Download Sandbox"
        type="button"
      >
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="inline mr-1"
        >
          <path
            d="M20.5 22H3.5C3.10218 22 2.72064 21.842 2.43934 21.5607C2.15804 21.2794 2 20.8978 2 20.5V15.5C2 15.3674 2.05268 15.2402 2.14645 15.1464C2.24021 15.0527 2.36739 15 2.5 15H3.5C3.63261 15 3.75979 15.0527 3.85355 15.1464C3.94732 15.2402 4 15.3674 4 15.5V20H20V15.5C20 15.3674 20.0527 15.2402 20.1464 15.1464C20.2402 15.0527 20.3674 15 20.5 15H21.5C21.6326 15 21.7598 15.0527 21.8536 15.1464C21.9473 15.2402 22 15.3674 22 15.5V20.5C22 20.8978 21.842 21.2794 21.5607 21.5607C21.2794 21.842 20.8978 22 20.5 22Z"
            fill="currentColor"
          ></path>
          <path
            d="M10.9999 2.5V13.79L8.81994 11.61C8.72479 11.5178 8.59747 11.4662 8.46494 11.4662C8.33241 11.4662 8.20509 11.5178 8.10994 11.61L7.39994 12.32C7.30769 12.4151 7.2561 12.5425 7.2561 12.675C7.2561 12.8075 7.30769 12.9348 7.39994 13.03L10.9399 16.56C11.0785 16.7003 11.2436 16.8117 11.4255 16.8877C11.6075 16.9637 11.8027 17.0029 11.9999 17.0029C12.1971 17.0029 12.3924 16.9637 12.5743 16.8877C12.7563 16.8117 12.9214 16.7003 13.0599 16.56L16.5999 13C16.6922 12.9048 16.7438 12.7775 16.7438 12.645C16.7438 12.5125 16.6922 12.3851 16.5999 12.29L15.8899 11.58C15.7948 11.4878 15.6675 11.4362 15.5349 11.4362C15.4024 11.4362 15.2751 11.4878 15.1799 11.58L12.9999 13.79V2.5C12.9999 2.36739 12.9473 2.24021 12.8535 2.14645C12.7597 2.05268 12.6325 2 12.4999 2H11.4999C11.3673 2 11.2402 2.05268 11.1464 2.14645C11.0526 2.24021 10.9999 2.36739 10.9999 2.5Z"
            fill="currentColor"
          ></path>
        </svg>
        Download</button
      ><button
        class="text-sm text-primary dark:text-primary-dark inline-flex items-center hover:text-link duration-100 ease-in transition mx-1"
        title="Reset Sandbox"
        type="button"
      >
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="inline ml-1 mr-1 relative"
        >
          <path
            d="M13.8982 5.20844C12.4626 4.88688 10.9686 4.93769 9.55821 5.35604L11.8524 3.06184C11.8989 3.0154 11.9357 2.96028 11.9608 2.89961C11.986 2.83894 11.9989 2.77391 11.9989 2.70824C11.9989 2.64256 11.986 2.57754 11.9608 2.51686C11.9357 2.45619 11.8989 2.40107 11.8524 2.35464L11.1456 1.64784C11.0992 1.60139 11.0441 1.56455 10.9834 1.53942C10.9227 1.51428 10.8577 1.50134 10.792 1.50134C10.7263 1.50134 10.6613 1.51428 10.6006 1.53942C10.54 1.56455 10.4848 1.60139 10.4384 1.64784L6.14571 5.94054C6.00654 6.07969 5.89615 6.2449 5.82083 6.42673C5.74551 6.60855 5.70675 6.80343 5.70675 7.00024C5.70675 7.19704 5.74551 7.39192 5.82083 7.57374C5.89615 7.75557 6.00654 7.92078 6.14571 8.05994L10.4387 12.3529C10.5325 12.4465 10.6595 12.4991 10.792 12.4991C10.9245 12.4991 11.0516 12.4465 11.1453 12.3529L11.8527 11.6455C11.9463 11.5518 11.9989 11.4247 11.9989 11.2922C11.9989 11.1598 11.9463 11.0327 11.8527 10.9389L8.77481 7.86104C9.99795 7.16236 11.415 6.8801 12.8125 7.05678C14.21 7.23347 15.5122 7.85953 16.523 8.84064C17.5338 9.82176 18.1983 11.1048 18.4165 12.4964C18.6347 13.888 18.3947 15.3129 17.7328 16.5562C17.0708 17.7996 16.0227 18.7942 14.7463 19.3902C13.47 19.9861 12.0345 20.1511 10.6563 19.8603C9.27798 19.5695 8.03152 18.8387 7.10469 17.778C6.17786 16.7172 5.62086 15.384 5.51761 13.9791C5.51156 13.8512 5.45689 13.7303 5.36477 13.6413C5.27265 13.5522 5.15001 13.5017 5.02191 13.5H4.02081C3.95297 13.4996 3.88574 13.5129 3.8232 13.5392C3.76065 13.5655 3.70408 13.6042 3.6569 13.6529C3.60972 13.7017 3.57291 13.7595 3.54869 13.8228C3.52448 13.8862 3.51336 13.9538 3.51601 14.0216C3.61349 15.5965 4.1473 17.1132 5.0577 18.4019C5.9681 19.6906 7.21917 20.7006 8.6709 21.3188C10.1226 21.937 11.7178 22.139 13.2778 21.9022C14.8378 21.6654 16.3011 20.9992 17.504 19.978C18.7069 18.9569 19.6019 17.6212 20.0889 16.1203C20.5759 14.6195 20.6356 13.0128 20.2614 11.4799C19.8872 9.94705 19.0938 8.54858 17.97 7.44098C16.8462 6.33339 15.4363 5.56037 13.8982 5.20844V5.20844Z"
            fill="currentColor"
          ></path>
        </svg>
        Reset</button
      ><a
        href="https://codesandbox.io/api/v1/sandboxes/define?parameters=N4IgZglgNgpgziAXKAggBzQOgFYOSAYwHsA7AFxnKXAFcSCyJSACAWQE8AhGss0gCgCUzYAB0SzZgCcYZGlIn9xkyQB4ARjz4kAfMpWSAkgHIAtswCGzTb1L61Aehva9E5oIDc4gL7jxMAA80IikyZgATGDALGigwsDoGJgkOdDQhEX0ZOQVmJTc1cIgAN1cDNQALAEYdAHUYKGJTGGY-ZlN2SwxVB2qy8tUOblsJB37HItL9Tx9xEAAaEAg4TggSCyl2JGioOBhvRbXIgJw8UGJySjJqCFNg0OYAJRgLBnmRZgBlMikIBlYiJFmN5mGApERzKIQDJXmQoV4SLd7mFgMwCDCKI8iEQwiCwRDmFCYQwALThCEOAhQCBXeHiJEhMJQzAOOBkdiwOCYAhwOB0kj0u6M5hpUHgyEgFlpfniC5s6TYsIAXjRGJgWJx_HJBBozXImAA5rIAKKwPVkTjsQzhJTQxVQwQzEjgnGYGQkSJSfJqb6_f6AmDjZiqUVjfQ9X1_MgAyKuTwLJYrNYbLaIHZ7A4gNkc-Dc3lIc6kChURAgABUmTc6iIARJcAgAC81gbENYQp6SdWAgjfAKSNXwp0xG4wEWSdFTNB2K24BYSHA6zBfmAEZJTBsDWtWwAmAAMaG7-jQFnCRRILeYu57fhI1Ura43axJfDQrav-lH5DrjZgO-3B-vPsKm3e92kfEhnyIV9L1XUEx3rBtf2YPcANmICAGZQPXKRNwgl831gz8yG_RDWyqAAOVCSF7cQKgAFiw8DIOg98R3gn8yIANiomjbwAVkYnCn3wmCP3Y0jmCqOieJvCpOME3DmIIsSvwQpCqn_Q9qJvYggWHSQiJI9TMG3GBTEA8RYlA49T2bElYDAMgd33LTeITZZVnWTZtgsXZ9kWNAaHUakCAcI5AkwCoyFMKAC0IIsrmoVQAEIABEAHkAGEABUAE0AAVjWYKKYtcVQSqgZgoDnA0lShSgoX6cqXnCINVGaMgrAICoNj2Mg6pAABVbKADESXIxr7GDDqrHWZoBuKGkAHdkShNEEvIAalogcIyAqJVIkWggYBJbbdoqd41ggRhfLrAhfJgJUqkwXdJoKYNGDIWAdFSogdXNHpPu-8NehapqB3YNrJmYHaBpdOEQB0HpJiapxAUh8QegqnR3KTLzU3TfyQGPAgAGsLCNU5SDii5i2uUt9MJEBIjQShInoGk-SQUDJCJF4GChVsoQAPQol6XqheYpr52EyQhQWmdF8jxdehZpehfniLgdEIDQMguaFkBhb4lWoX0A59Chdc1gVqEwo9CLcEly3mZgYpUpgVmHY5-AFeAXtvFxzyUx8vzvEzCg7mqihqHRF4KBJYliIsDAQG8IA&amp;query=file%3D%252FApp.js%26utm_medium%3Dsandpack"
        rel="noreferrer noopener"
        target="_blank"
        title="Open in CodeSandbox"
        class="text-sm text-primary dark:text-primary-dark inline-flex items-center hover:text-link duration-100 ease-in transition mx-1 ml-2 md:ml-1"
        ><svg
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="inline ml-1 mr-1 relative top-[1px]"
        >
          <path
            d="M20.5001 2H15.5001C15.3675 2 15.2403 2.05268 15.1465 2.14645C15.0528 2.24021 15.0001 2.36739 15.0001 2.5V3.5C15.0001 3.63261 15.0528 3.75979 15.1465 3.85355C15.2403 3.94732 15.3675 4 15.5001 4H18.5901L7.6501 14.94C7.60323 14.9865 7.56604 15.0418 7.54065 15.1027C7.51527 15.1636 7.5022 15.229 7.5022 15.295C7.5022 15.361 7.51527 15.4264 7.54065 15.4873C7.56604 15.5482 7.60323 15.6035 7.6501 15.65L8.3501 16.35C8.39658 16.3969 8.45188 16.4341 8.51281 16.4594C8.57374 16.4848 8.63909 16.4979 8.7051 16.4979C8.7711 16.4979 8.83646 16.4848 8.89738 16.4594C8.95831 16.4341 9.01362 16.3969 9.0601 16.35L20.0001 5.41V8.5C20.0001 8.63261 20.0528 8.75979 20.1465 8.85355C20.2403 8.94732 20.3675 9 20.5001 9H21.5001C21.6327 9 21.7599 8.94732 21.8537 8.85355C21.9474 8.75979 22.0001 8.63261 22.0001 8.5V3.5C22.0001 3.10218 21.8421 2.72064 21.5608 2.43934C21.2795 2.15804 20.8979 2 20.5001 2V2Z"
            fill="currentColor"
          ></path>
          <path
            d="M21.5 13H20.5C20.3674 13 20.2402 13.0527 20.1464 13.1464C20.0527 13.2402 20 13.3674 20 13.5V20H4V4H10.5C10.6326 4 10.7598 3.94732 10.8536 3.85355C10.9473 3.75979 11 3.63261 11 3.5V2.5C11 2.36739 10.9473 2.24021 10.8536 2.14645C10.7598 2.05268 10.6326 2 10.5 2H3.5C3.10218 2 2.72064 2.15804 2.43934 2.43934C2.15804 2.72064 2 3.10218 2 3.5V20.5C2 20.8978 2.15804 21.2794 2.43934 21.5607C2.72064 21.842 3.10218 22 3.5 22H20.5C20.8978 22 21.2794 21.842 21.5607 21.5607C21.842 21.2794 22 20.8978 22 20.5V13.5C22 13.3674 21.9473 13.2402 21.8536 13.1464C21.7598 13.0527 21.6326 13 21.5 13Z"
            fill="currentColor"
          ></path></svg
        ><span class="hidden md:block">Fork</span></a
      >
    </div>
  </div>
  <div class="sp-layout sp-layout-expanded">
    <div class="sp-stack sp-editor">
      <div class="sp-code-editor">
        <div
          aria-autocomplete="list"
          aria-label="Code Editor for App.js"
          aria-multiline="true"
          class="sp-cm sp-pristine sp-javascript"
          role="textbox"
          tabindex="0"
          translate="no"
        >
         
        </div>
      </div>
    </div>
    <div class="sp-stack order-last xl:order-2">
      <div
        class="p-0 sm:p-2 md:p-4 lg:p-8 bg-card dark:bg-wash-dark h-full relative md:rounded-b-lg lg:rounded-b-none"
      >
        <div>
          <iframe
            class="rounded-t-none bg-white md:shadow-md sm:rounded-lg w-full max-w-full transition-opacity opacity-100 duration-150"
            title="Sandbox Preview"
            sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
          ></iframe>
        </div>
      </div>
    </div>
    <button
      translate="yes"
      class="sandpack-expand flex text-base justify-between dark:border-card-dark bg-wash dark:bg-card-dark items-center z-10 p-1 w-full order-2 xl:order-last border-b-1 relative top-0"
    >
      <span
        class="flex p-2 focus:outline-none text-primary dark:text-primary-dark leading-[20px]"
        ><svg
          class="rotate-180 inline mr-1.5 text-xl"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <g fill="none" fill-rule="evenodd" transform="translate(-446 -398)">
            <path
              fill="currentColor"
              fill-rule="nonzero"
              d="M95.8838835,240.366117 C95.3957281,239.877961 94.6042719,239.877961 94.1161165,240.366117 C93.6279612,240.854272 93.6279612,241.645728 94.1161165,242.133883 L98.6161165,246.633883 C99.1042719,247.122039 99.8957281,247.122039 100.383883,246.633883 L104.883883,242.133883 C105.372039,241.645728 105.372039,240.854272 104.883883,240.366117 C104.395728,239.877961 103.604272,239.877961 103.116117,240.366117 L99.5,243.982233 L95.8838835,240.366117 Z"
              transform="translate(356.5 164.5)"
            ></path>
            <polygon points="446 418 466 418 466 398 446 398"></polygon>
          </g></svg
        >Show less</span
      >
    </button>
  </div>
</div>

    </main>
  )
}
