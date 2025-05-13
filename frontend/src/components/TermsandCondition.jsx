
const TermsandConditions = ({
  agreedTerms,
  setAgreedTerms,
  agreedConsent,
  setAgreedConsent,
  error,
}) => {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-2 text-gray-300">Terms & Conditions</h4>

      <p className="text-sm text-red-500">
        Xploride takes your personal data rights and security seriously. To
        proceed with your booking, we need you to consent to our collecting,
        processing, and storing your personal data in accordance with our
        Privacy Policy. We also require that you agree to our Booking Conditions
        and Terms of Service.
      </p>

      <div className="flex items-start space-x-2 pt-4">
        <input
          type="checkbox"
          id="terms-agree"
          checked={agreedTerms}
          onChange={(e) => setAgreedTerms(e.target.checked)}
          className="w-5 h-4 mt-1"
        />
        <label htmlFor="terms-agree" className="text-sm text-gray-300">
          I agree to the Terms and Conditions
        </label>
      </div>

      <div className="flex items-start space-x-2 pt-2">
        <input
          type="checkbox"
          id="consent-agree"
          checked={agreedConsent}
          onChange={(e) => setAgreedConsent(e.target.checked)}
          className="w-12 h-4 mt-2"
        />
        <label htmlFor="consent-agree" className="text-sm text-gray-300">
          I consent to Xploride processing the personal data I provide for the
          purposes of providing services including tour operations and
          understand that Xploride will contact me about my booking.
        </label>
      </div>

      {error && <p className="text-sm text-red-500 pt-2">{error}</p>}
    </div>
  );
};

export default TermsandConditions;





