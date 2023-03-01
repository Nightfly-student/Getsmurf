import redis from "./index";

export const deleteMultipleKeys = async (pattern: string) => {
    const stream = redis.scanStream({
        match: pattern,
    });

    stream.on('data', function (keys) {
        if (keys.length) {
            var pipeline = redis.pipeline();
            keys.forEach(function (key: any) {
                pipeline.del(key);
            });
            pipeline.exec();
        }
    });

    stream.on('end', function () {
        console.log('done');
    });
};