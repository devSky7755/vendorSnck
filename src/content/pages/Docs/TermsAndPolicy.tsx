import { Box, Container, Card, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';

const OnboardingWrapper = styled(Box)(
    () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
`
);

function TermsAndPolicy() {
    return (
        <OnboardingWrapper sx={{ pt: 8 }}>
            <Helmet>
                <title>Terms &amp; Privacy Policy</title>
            </Helmet>
            <Container maxWidth='md'>
                <Card sx={{ p: 3, mt: 4, mb: 10, borderRadius: 0 }}>
                    <Typography sx={{ mb: 4 }} variant="h1">
                        Terms &amp; Privacy Policy
                    </Typography>
                    <b>1. Purpose of Policy</b>
                    <p>
                        This Privacy Policy applies to the collection, use, disclosure and handling of personal information by Snackr Enterprises Pty Ltd (ACN 625 544 514) (also referred to as Snackr, we or us), including personal information collected via the application, website, product and services operated and made available by Snackr. Defined terms in this Privacy Policy have the same meanings as set out in the Terms and Conditions found here www.snackr.com.au.
                    </p>
                    <p>
                        We are committed to protecting the privacy of individuals and are bound by the Australian Privacy Principles set out in the Privacy Act 1988 (Cth) (Act). We will only collect, use or disclose personal information in accordance with the Act and this Privacy Policy.
                    </p>

                    <b>2. Collection</b>
                    <p>
                        Snackr collects personal information from you in a number of different ways. We may collect personal information directly from you or in the course of our dealings with you, for example when you create an account in the App, provide personal information to us or contact and correspond with us.
                    </p>
                    <p>
                        The personal information we collect about you may include (but may not be limited to) your name, email address and telephone number. The purposes for which we collect your information include verifying your identify, contacting you, and delivering the Services. If we are not able to collect personal information about you we may not be able to provide you with the Services.
                    </p>
                    <b>3. Use and Disclosure</b>
                    <p>
                        Snackr may use or disclose your personal information for the purpose for which it was collected and in accordance with Australian law
                    </p>
                </Card>
            </Container>
        </OnboardingWrapper>
    );
}

export default TermsAndPolicy;
