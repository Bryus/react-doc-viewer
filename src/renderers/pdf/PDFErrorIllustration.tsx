import React, { useId } from "react";

interface PDFErrorIllustrationProps {
  width?: number;
  height?: number;
}

const PDFErrorIllustration = ({
  width = 200,
  height = 200,
}: PDFErrorIllustrationProps) => {
  const baseId = useId().replace(/:/g, "");
  const mask0 = `${baseId}-mask0`;
  const filter0 = `${baseId}-filter0`;
  const paint0 = `${baseId}-paint0`;
  const paint1 = `${baseId}-paint1`;
  const paint2 = `${baseId}-paint2`;
  const paint3 = `${baseId}-paint3`;
  const filter1 = `${baseId}-filter1`;
  const paint4 = `${baseId}-paint4`;
  const paint5 = `${baseId}-paint5`;
  const paint6 = `${baseId}-paint6`;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <mask id={mask0} maskUnits="userSpaceOnUse" x="32" y="34" width="109" height="109">
        <path
          d="M140.599 88.3418C140.599 118.307 116.307 142.599 86.3419 142.599C56.3766 142.599 32.085 118.307 32.085 88.3418C32.085 58.3765 56.3766 34.0849 86.3419 34.0849C116.307 34.0849 140.599 58.3765 140.599 88.3418Z"
          fill="#EEF1F7"
        />
      </mask>
      <g mask={`url(#${mask0})`}>
        <path
          d="M152.769 88.3418C152.769 125.028 123.028 154.768 86.3419 154.768C49.6554 154.768 19.9152 125.028 19.9152 88.3418C19.9152 51.6553 49.6554 21.9151 86.3419 21.9151C123.028 21.9151 152.769 51.6553 152.769 88.3418Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M86.2574 139.015C114.29 139.015 137.015 116.29 137.015 88.2574C137.015 60.2249 114.29 37.5 86.2574 37.5C58.2249 37.5 35.5 60.2249 35.5 88.2574C35.5 116.29 58.2249 139.015 86.2574 139.015Z"
          fill="white"
        />
        <g filter={`url(#${filter0})`}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M88.2574 132.015C116.29 132.015 139.015 109.29 139.015 81.2574C139.015 53.2249 116.29 30.5 88.2574 30.5C60.2249 30.5 37.5 53.2249 37.5 81.2574C37.5 109.29 60.2249 132.015 88.2574 132.015Z"
            fill={`url(#${paint0})`}
          />
        </g>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M100.753 54.8819L99.0176 31.1519L102.01 30.9331L103.658 53.4706L124.69 42.4471L126.083 45.1043L90.3549 63.83L88.1463 85.3758L92.2352 105.832L77.0445 146.17L74.237 145.113L89.1251 105.578L85.3097 86.4899L62.8614 76.1231L56.4659 57.5069L46.5146 51.422L48.0797 48.8626L58.9523 55.5109L65.2824 73.9367L75.3333 78.5783L86.3807 73.1799L87.5348 61.921L100.999 54.8639L100.753 54.8819ZM86.0204 76.695L78.8463 80.2006L85.3531 83.2055L86.0204 76.695Z"
          fill={`url(#${paint1})`}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M98.4825 30.6897L102.472 30.3979L104.101 52.6739L124.901 41.7721L126.758 45.315L90.8249 64.1482L88.6514 85.3518L92.7536 105.875L77.3362 146.814L73.5929 145.404L88.6068 105.536L84.8692 86.8373L62.458 76.4875L56.0515 57.8396L45.8273 51.5877L47.914 48.1751L59.3667 55.1782L65.6859 73.5722L75.3273 78.0247L85.9117 72.8525L87.0648 61.6028L100.238 54.6983L98.4825 30.6897ZM100.753 54.8819L100.999 54.8639L87.5349 61.9209L86.3808 73.1798L75.3333 78.5783L65.2824 73.9367L58.9523 55.5108L48.0797 48.8626L46.5147 51.422L56.4659 57.5069L62.8615 76.1231L85.3097 86.4899L89.1251 105.578L74.237 145.113L77.0445 146.17L92.2352 105.832L88.1464 85.3758L90.3549 63.83L126.083 45.1043L124.69 42.4471L103.658 53.4706L102.01 30.9331L99.0177 31.1519L100.753 54.8819ZM78.8464 80.2006L85.3531 83.2055L86.0205 76.6949L78.8464 80.2006ZM80.0113 80.1879L84.9271 82.458L85.4313 77.5393L80.0113 80.1879Z"
          fill={`url(#${paint2})`}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M100.753 54.8819L99.0174 31.1519L102.009 30.9331L103.658 53.4706L124.69 42.4471L126.083 45.1043L90.3546 63.83L88.1461 85.3758L92.235 105.832L77.0442 146.17L74.2367 145.113L89.1249 105.578L85.3094 86.4899L62.8612 76.1231L56.4657 57.5069L46.5144 51.422L48.0794 48.8626L58.952 55.5109L65.2822 73.9367L75.3331 78.5783L86.3805 73.1799L87.5346 61.921L100.999 54.8639L100.753 54.8819ZM86.0202 76.695L78.8461 80.2006L85.3528 83.2055L86.0202 76.695Z"
          fill={`url(#${paint3})`}
        />
        <g filter={`url(#${filter1})`}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M86.2574 41C59.6056 41 38 62.6056 38 89.2574C38 115.909 59.6056 137.515 86.2574 137.515C112.909 137.515 134.515 115.909 134.515 89.2574C134.515 62.6056 112.909 41 86.2574 41ZM33 89.2574C33 59.8441 56.8441 36 86.2574 36C115.671 36 139.515 59.8441 139.515 89.2574C139.515 118.671 115.671 142.515 86.2574 142.515C56.8441 142.515 33 118.671 33 89.2574Z"
            fill={`url(#${paint4})`}
          />
        </g>
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M160.064 167.807C158.103 169.767 154.921 169.758 152.972 167.785L119.724 134.14L135.828 118.036L169.474 151.284C171.446 153.233 171.456 156.415 169.495 158.376L160.064 167.807Z"
        fill="#9DB0CC"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M158.331 173.67C156.368 175.633 153.182 175.621 151.233 173.644L116.744 138.642L137.41 117.975L170.977 151.051C173.745 153.778 173.762 158.239 171.014 160.986L158.331 173.67Z"
        fill="#8197B6"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M86.2574 139.015C114.29 139.015 137.015 116.29 137.015 88.2574C137.015 60.2249 114.29 37.5 86.2574 37.5C58.2249 37.5 35.5 60.2249 35.5 88.2574C35.5 116.29 58.2249 139.015 86.2574 139.015ZM86.2574 148.515C119.537 148.515 146.515 121.537 146.515 88.2574C146.515 54.9782 119.537 28 86.2574 28C52.9782 28 26 54.9782 26 88.2574C26 121.537 52.9782 148.515 86.2574 148.515Z"
        fill={`url(#${paint5})`}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M122.239 135.974L151.914 166.003C154.448 168.567 158.584 168.579 161.134 166.03L167.719 159.445C170.268 156.896 170.256 152.759 167.691 150.226L136.977 119.874L137.185 119.536C142.785 110.438 146.015 99.7255 146.015 88.2574C146.015 55.2543 119.26 28.5 86.2574 28.5C53.2543 28.5 26.5 55.2543 26.5 88.2574C26.5 121.26 53.2543 148.015 86.2574 148.015C99.6117 148.015 111.942 143.635 121.891 136.233L122.239 135.974ZM137.515 88.2574C137.515 116.566 114.566 139.515 86.2574 139.515C57.9487 139.515 35 116.566 35 88.2574C35 59.9487 57.9487 37 86.2574 37C114.566 37 137.515 59.9487 137.515 88.2574ZM137.611 119.798C143.258 110.623 146.515 99.8207 146.515 88.2574C146.515 54.9782 119.537 28 86.2574 28C52.9782 28 26 54.9782 26 88.2574C26 121.537 52.9782 148.515 86.2574 148.515C99.7228 148.515 112.157 144.098 122.189 136.634L151.558 166.354C154.287 169.116 158.742 169.129 161.487 166.384L168.072 159.799C170.817 157.054 170.804 152.599 168.043 149.87L137.611 119.798ZM86.2574 139.015C114.29 139.015 137.015 116.29 137.015 88.2574C137.015 60.2249 114.29 37.5 86.2574 37.5C58.2249 37.5 35.5 60.2249 35.5 88.2574C35.5 116.29 58.2249 139.015 86.2574 139.015Z"
        fill="black"
        fillOpacity="0.05"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M137.515 88.2574C137.515 116.566 114.566 139.515 86.2574 139.515C57.9487 139.515 35 116.566 35 88.2574C35 59.9487 57.9487 37 86.2574 37C114.566 37 137.515 59.9487 137.515 88.2574ZM137.015 88.2574C137.015 116.29 114.29 139.015 86.2574 139.015C58.2249 139.015 35.5 116.29 35.5 88.2574C35.5 60.2249 58.2249 37.5 86.2574 37.5C114.29 37.5 137.015 60.2249 137.015 88.2574Z"
        fill={`url(#${paint6})`}
      />
      <defs>
        <filter
          id={filter0}
          x="33.5"
          y="26.5"
          width="109.515"
          height="109.515"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_788:26738" />
        </filter>
        <filter
          id={filter1}
          x="21"
          y="24"
          width="130.515"
          height="130.515"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="6" result="effect1_foregroundBlur_788:26738" />
        </filter>
        <linearGradient id={paint0} x1="96.5" y1="31" x2="72" y2="127.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EFF2F8" />
          <stop offset="0.967839" stopColor="#E3E9F1" />
        </linearGradient>
        <radialGradient
          id={paint1}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(86.3419 88.3419) rotate(92.9817) scale(64.2451 43.7776)"
        >
          <stop stopColor="#C1CCDC" />
          <stop offset="0.57585" stopColor="#C1CCDC" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={paint2} x1="86" y1="31" x2="95.5" y2="159.5" gradientUnits="userSpaceOnUse">
          <stop offset="0.106129" stopColor="white" stopOpacity="0" />
          <stop offset="0.439008" stopColor="white" />
          <stop offset="0.742576" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={paint3} x1="97.5" y1="33" x2="77" y2="143" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C1CDDD" stopOpacity="0.58" />
          <stop offset="0.869931" stopColor="#C3CFE0" />
          <stop offset="0.921677" stopColor="#C1CDDD" stopOpacity="0.46" />
        </linearGradient>
        <linearGradient id={paint4} x1="107.5" y1="43.5" x2="82" y2="142.5" gradientUnits="userSpaceOnUse">
          <stop offset="0.0362397" stopColor="#8197B6" />
          <stop offset="1" stopColor="#8197B6" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={paint5} x1="86.2574" y1="28" x2="86.2574" y2="148.515" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9EB1CD" />
          <stop offset="0.72594" stopColor="#8196B5" />
        </linearGradient>
        <linearGradient id={paint6} x1="86.2574" y1="37.5" x2="86" y2="143" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5F7596" />
          <stop offset="1" stopColor="#8197B6" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default PDFErrorIllustration;
