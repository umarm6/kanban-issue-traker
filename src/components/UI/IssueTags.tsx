export default function IssueTags(tags: string[]) {
    return (
        <>
        {tags && tags.map(tag => (
            <span
                key={tag}
               className="issus-tags"
            >
            {tag}
            </span>
        ))}
        </>
    );
}