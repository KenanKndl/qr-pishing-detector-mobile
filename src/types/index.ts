/**
 * Represents the structured analysis result of a scanned QR code URL.
 */
export interface ScanResult {
    /** The decoded URL string obtained from the QR code. */
    url: string;

    /** * The security classification of the URL.
     * 'SAFE': No threats detected.
     * 'MALICIOUS': Potential phishing or malware threat detected.
     */
    status: 'SAFE' | 'MALICIOUS';

    /** * The confidence score of the model's prediction formatted as a percentage string (e.g., "%92").
     * Higher values indicate higher certainty in the classification.
     */
    confidence: string;

    /** The name of the deep learning architecture used for inference (e.g., "CNN + LSTM"). */
    modelType: string;
}