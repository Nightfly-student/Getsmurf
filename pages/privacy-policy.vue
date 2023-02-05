<template>
    <div>
        <div class="py-20 bg-zinc-800 rounded-t-20">
            <h1 class="text-5xl font-semibold text-center">Privacy Policy</h1>
        </div>
        <div class="pt-20">
            <div className="m-auto">
                <p>
                    At GetSmurf, accessible from&nbsp;
                    <a class="text-red-500 hover:text-red-700" href="https://getsmurf.com/">https://getsmurf.com/</a>,
                    one of
                    our main priorities is the privacy of our visitors. This Privacy
                    Policy document contains types of information that is collected and
                    recorded by GetSmurf and how we use it.
                </p>
                <h2 class="text-xl font-semibold py-2">General Data Protection Regulation (GDPR)</h2>
                <p>We are a Data Controller of your information.</p>
                <p>
                    GetSmurf legal basis for collecting and using the personal
                    information described in this Privacy Policy depends on the Personal
                    Information we collect and the specific context in which we collect
                    the information:
                </p>
                <ul class="list-disc pl-5 py-2">
                    <li>GetSmurf needs to perform a contract with you</li>
                    <li>You have given GetSmurf permission to do so</li>
                    <li>
                        Processing your personal information is in GetSmurf legitimate
                        interests
                    </li>
                    <li>GetSmurf needs to comply with the law</li>
                </ul>
                <p>
                    GetSmurf will retain your personal information only for as long as
                    is necessary for the purposes set out in this Privacy Policy. We will
                    retain and use your information to the extent necessary to comply with
                    our legal obligations, resolve disputes, and enforce our policies.
                </p>
                <p>
                    If you are a resident of the European Economic Area (EEA), you have
                    certain data protection rights. If you wish to be informed what
                    Personal Information we hold about you and if you want it to be
                    removed from our systems, please contact us.
                </p>
                <p>
                    In certain circumstances, you have the following data protection
                    rights:
                </p>
                <ul class="list-disc pl-5 py-2">
                    <li>
                        The right to access, update or to delete the information we have on
                        you.
                    </li>
                    <li>The right of rectification.</li>
                    <li>The right to object.</li>
                    <li>The right of restriction.</li>
                    <li>The right to data portability</li>
                    <li>The right to withdraw consent</li>
                </ul>
                <h2 class="text-xl font-semibold py-2">Log Files</h2>
                <p>
                    GetSmurf follows a standard procedure of using log files. These
                    files log visitors when they visit websites. All hosting companies do
                    this and a part of hosting services&rsquo; analytics. The information
                    collected by log files include internet protocol (IP) addresses,
                    browser type, Internet Service Provider (ISP), date and time stamp,
                    referring/exit pages, and possibly the number of clicks. These are not
                    linked to any information that is personally identifiable. The purpose
                    of the information is for analyzing trends, administering the site,
                    tracking users&rsquo; movement on the website, and gathering
                    demographic information.
                </p>
                <h2 class="text-xl font-semibold py-2">Cookies and Web Beacons</h2>
                <p>
                    Like any other website, GetSmurf uses &lsquo;cookies&rsquo;. These
                    cookies are used to store information including visitors&rsquo;
                    preferences, and the pages on the website that the visitor accessed or
                    visited. The information is used to optimize the users&rsquo;
                    experience by customizing our web page content based on
                    visitors&rsquo; browser type and/or other information.
                </p>
                <p>
                    For more general information on cookies, please read&nbsp;
                    <a href="https://www.privacypolicyonline.com/what-are-cookies/">
                        &ldquo;What Are Cookies&rdquo;
                    </a>
                    .
                </p>
                <h2 class="text-xl font-semibold py-2">Our Advertising Partners</h2>
                <p>
                    Some of advertisers on our site may use cookies and web beacons. Our
                    advertising partners are listed below. Each of our advertising
                    partners has their own Privacy Policy for their policies on user data.
                    For easier access, we hyperlinked to their Privacy Policies below.
                </p>
                <ul class="list-disc pl-5 py-2">
                    <li>
                        <a href="https://policies.google.com/technologies/ads">Google</a>
                    </li>
                </ul>
                <h2 class="text-xl font-semibold py-2">Privacy Policies</h2>
                <p>
                    You may consult this list to find the Privacy Policy for each of the
                    advertising partners of GetSmurf.
                </p>
                <p>
                    Third-party ad servers or ad networks uses technologies like cookies,
                    JavaScript, or Web Beacons that are used in their respective
                    advertisements and links that appear on GetSmurf, which are sent
                    directly to users&rsquo; browser. They automatically receive your IP
                    address when this occurs. These technologies are used to measure the
                    effectiveness of their advertising campaigns and/or to personalize the
                    advertising content that you see on websites that you visit.
                </p>
                <p>
                    Note that GetSmurf has no access to or control over these cookies
                    that are used by third-party advertisers.
                </p>
                <h2 class="text-xl font-semibold py-2">Third Party Privacy Policies</h2>
                <p>
                    GetSmurf&rsquo;s Privacy Policy does not apply to other advertisers
                    or websites. Thus, we are advising you to consult the respective
                    Privacy Policies of these third-party ad servers for more detailed
                    information. It may include their practices and instructions about how
                    to opt-out of certain options.
                </p>
                <p>
                    You can choose to disable cookies through your individual browser
                    options. To know more detailed information about cookie management
                    with specific web browsers, it can be found at the browsers&rsquo;
                    respective websites.
                </p>
                <h2 class="text-xl font-semibold py-2">Children&rsquo;s Information</h2>
                <p>
                    GetSmurf does not knowingly collect any Personal Identifiable
                    Information from children under the age of 13. If you think that your
                    child provided this kind of information on our website, we strongly
                    encourage you to contact us immediately and we will do our best
                    efforts to promptly remove such information from our records.
                </p>
                <h2 class="text-xl font-semibold py-2">Online Privacy Policy Only</h2>
                <p>
                    Our Privacy Policy applies only to our online activities and is valid
                    for visitors to our website with regards to the information that they
                    shared and/or collect in GetSmurf. This policy is not applicable to
                    any information collected offline or via channels other than this
                    website.
                </p>
                <h2 class="text-xl font-semibold py-2">Consent</h2>
                <p>
                    By using our website, you hereby consent to our Privacy Policy and
                    agree to its terms.
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

const config = useRuntimeConfig();
const route = useRoute();
useHead({
    title: "Privacy Policy - GetSmurf",
    link: [
        {
            rel: "canonical",
            href: `${config.appUrl + route.fullPath}`,
        },
    ],
    meta: [
        {
            name: "description",
            content:
                "Privacy Policy, learn more about how we use your data and how we protect your privacy."
        },
        {
            property: "og:title",
            content: "Privacy Policy - GetSmurf",
        },
        {
            property: "og:description",
            content:
                "Privacy Policy, learn more about how we use your data and how we protect your privacy.",
        },
        {
            property: "og:image",
            content:
                "https://res.cloudinary.com/dxns0vltg/image/upload/v1674891238/Santa_Draven_2K_pb8edz_1_lu2uku.png",
        },
        { property: "og:type", content: "website" },
    ],
});
</script>