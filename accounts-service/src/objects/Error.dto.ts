export class Error {
    /** @description A localized message string describing the error condition. */
    message: string;
    /** @description A unique identifier for this error instance. This may be used as a correlation ID with the root cause error (i.e. this ID may be logged at the source of the error). This is is an opaque string. */
    _id?: string;
    /**
     * @description The HTTP status code associate with this error.
     * @example 400
     */
    statusCode?: number;
    /** @description An error identifier which indicates the category of error and associate it with API support documentation or which the UI tier can use to render an appropriate message or hint. This provides a finer level of granularity than the `statusCode`. For example, instead of just 400 Bad Request, the `type` may be much more specific. */
    type?: string;
    /**
     * Format: date-time
     * @description An [RFC 3339](https://tools.ietf.org/html/rfc3339) UTC time stamp indicating when the error occurred.
     * @example 2018-02-02T03:37:15.375Z
     */
    occurredAt?: string;
    /** @description An optional localized string which provides hints for how the user or client can resolve the error. */
    remediation?: string;
}