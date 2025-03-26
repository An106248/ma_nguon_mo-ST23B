let bookings = [
    { id: 1, customerName: "Nguyễn Văn A", date: "2025-03-20", time: "14:00", status: "Pending" },
    { id: 2, customerName: "Trần Thị B", date: "2025-03-21", time: "16:00", status: "Confirmed" }
];

// Hàm kiểm tra trùng lịch
const checkBookingConflict = (date, time, excludeId = null) => {
    return bookings.find(b => 
        b.date === date && 
        b.time === time && 
        b.status !== 'Cancelled' &&
        b.id !== excludeId
    );
};

// Hàm kiểm tra ngày hợp lệ
const isValidDate = (date) => {
    const bookingDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return bookingDate >= today;
};

// Controller methods
exports.getAllBookings = (req, res) => {
    // Chỉ hiển thị messages nếu có trong session
    const messages = req.session.messages || {};
    // Xóa messages sau khi hiển thị
    req.session.messages = {};
    
    res.render("index", { 
        bookings,
        messages
    });
};

exports.getNewBookingForm = (req, res) => {
    res.render("new-booking");
};

exports.createBooking = (req, res) => {
    const { customerName, date, time } = req.body;
    
    if (!isValidDate(date)) {
        return res.render("new-booking", {
            error: "Không thể đặt lịch cho ngày trong quá khứ",
            formData: { customerName, date, time }
        });
    }

    if (checkBookingConflict(date, time)) {
        return res.render("new-booking", {
            error: "Thời gian này đã có người đặt",
            formData: { customerName, date, time }
        });
    }

    const newBooking = {
        id: bookings.length + 1,
        customerName,
        date,
        time,
        status: "Pending"
    };
    
    bookings.push(newBooking);
    req.session.messages = { success: "Đặt chỗ thành công!" };
    res.redirect("/");
};

exports.getEditBookingForm = (req, res) => {
    const booking = bookings.find(b => b.id == req.params.id);
    if (!booking) {
        req.session.messages = { error: "Không tìm thấy đặt chỗ!" };
        return res.redirect("/");
    }
    res.render("edit-booking", { booking });
};

exports.updateBooking = (req, res) => {
    const { customerName, date, time } = req.body;
    const bookingId = parseInt(req.params.id);
    
    if (!isValidDate(date)) {
        return res.render("edit-booking", {
            error: "Không thể đặt lịch cho ngày trong quá khứ",
            booking: { id: bookingId, customerName, date, time }
        });
    }

    if (checkBookingConflict(date, time, bookingId)) {
        return res.render("edit-booking", {
            error: "Thời gian này đã có người đặt",
            booking: { id: bookingId, customerName, date, time }
        });
    }

    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) {
        req.session.messages = { error: "Không tìm thấy đặt chỗ!" };
        return res.redirect("/");
    }

    Object.assign(booking, { customerName, date, time });
    req.session.messages = { success: "Cập nhật thành công!" };
    res.redirect("/");
};

exports.confirmBooking = (req, res) => {
    const booking = bookings.find(b => b.id == req.params.id);
    if (!booking) {
        req.session.messages = { error: "Không tìm thấy đặt chỗ!" };
        return res.redirect("/");
    }
    
    if (booking.status === 'Pending') {
        booking.status = "Confirmed";
        req.session.messages = { success: "Đã xác nhận đặt chỗ thành công!" };
    } else {
        req.session.messages = { error: "Không thể xác nhận đặt chỗ này!" };
    }
    res.redirect("/");
};

exports.cancelBooking = (req, res) => {
    const booking = bookings.find(b => b.id == req.params.id);
    if (!booking) {
        req.session.messages = { error: "Không tìm thấy đặt chỗ!" };
        return res.redirect("/");
    }
    
    if (booking.status !== 'Cancelled') {
        booking.status = "Cancelled";
        req.session.messages = { success: "Đã hủy đặt chỗ thành công!" };
    } else {
        req.session.messages = { error: "Đặt chỗ này đã bị hủy!" };
    }
    res.redirect("/");
};

exports.deleteBooking = (req, res) => {
    const bookingId = parseInt(req.params.id);
    const index = bookings.findIndex(b => b.id === bookingId);
    
    if (index !== -1) {
        bookings.splice(index, 1);
        req.session.messages = { success: "Đã xóa lịch đặt thành công!" };
    } else {
        req.session.messages = { error: "Không tìm thấy lịch đặt!" };
    }
    res.redirect("/");
};
