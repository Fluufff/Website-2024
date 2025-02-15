#!/usr/bin/env bash
# Tested with mitmproxy 10.3.1

# server-replay-reuse likely not needed, but can't hurt
mitmdump \
    --server-replay mitmproxy-build-flows \
    --server-replay-extra 500 \
    --server-replay-reuse \
    --set connection_strategy=lazy \
    --listen-port 3001 --mode reverse:https://dcm.fluufff.org
